from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess as sp, os, tkinter as tk
from tkinter import filedialog

app = Flask(__name__)
CORS(app)

@app.route("/download", methods=["OPTIONS"])
def options():
    response = jsonify({"message": "CORS preflight passed successfully."})
    response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type")
    return response

@app.route("/download", methods=["POST"])
def download():
    data = request.json
    url = data.get("url")
    duration = data.get("duration", 600)
    format = data.get("format", "mp3").lower()
    valid_formats = ["mp3", "wav", "ogg", "flac"]

    if not url:
        print("ERROR: No URL recieved.")
        return jsonify({"error": "No URL provided"}), 400
    if not isinstance(duration, int) or duration <= 0:
        print("ERROR Invalid duration!", duration)
        return jsonify({"error": "Invalid duration"}), 400
    if format not in valid_formats:
        print("ERROR: Invalid format!", format)
        return jsonify({"error": "Invalid format"}), 400

    try:
        root = tk.Tk()
        root.withdraw()
        root.attributes("-topmost", True)
        save_path = filedialog.asksaveasfilename(
            defaultextension=f".{format}",
            filetypes=[(f"{format.upper()} files", f"*.{format}")],
            title=f"Save {format.upper()} file to..."
        )
        root.destroy()
        
        if not save_path:
            return jsonify({"error": "No save location chosen."}), 400
        
        temp_audio_path = os.path.splitext(save_path)[0] + ".mp4"
        
        download_section = f"*0-{duration}"

        sp.run(["yt-dlp", "-f", "bestaudio", "--download-sections", download_section, "-o", temp_audio_path, url], check=True)

        if format == "mp3":
            codec = ["-codec:a", "libmp3lame", "-b:a", "192k"]
        elif format == "wav":
            codec = ["-codec:a", "pcm_s16le"]
        elif format == "ogg":
            codec = ["-codec:a", "libvorbis", "-q:a", "5"]
        elif format == "flac":
            codec = ["-codec:a", "flac"]

        sp.run(["ffmpeg", "-i", temp_audio_path, "-vn"] + codec + [save_path], check=True)
        os.remove(temp_audio_path)
        return jsonify({"message": "Download complete!", "file": save_path})
    
    except sp.CalledProcessError as e:
        return jsonify({"error": f"Download failed: {e}"}), 500
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
if __name__ == "__main__":
    app.run(port=5000, debug=True)
