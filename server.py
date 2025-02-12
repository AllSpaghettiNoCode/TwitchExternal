from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess as sp, os, tkinter as tk
from tkinter import filedialog

app = Flask(__name__)
CORS(app)

@app.route("/download", methods=["POST"])
def download():
    data = request.json
    url = data.get("url")
    duration = data.get("duration", 600)
    if not url:
        return jsonify({"error": "No URL provided"}), 400
    
    try:
        root = tk.Tk()
        root.withdraw()
        save_path = filedialog.asksaveasfilename(
            defaultextension=".mp3",
            filetypes=[("MP3 files", "*.mp3")],
            title="Save mp3 file to..."
        )
        if not save_path:
            return jsonify({"error": "No save location chosen, cancelling..."}), 400
        
        video_path = save_path.replace(".mp3", ".mp4")
        
        download_section = f"*0-{duration}"

        sp.run(["yt-dlp", "-f", "bestaudio", "--download-sections", download_section, "-o", video_path, url], check=True)
        sp.run(["ffmpeg", "-i", video_path, "-vn", "-b:a", "192k", save_path], check=True)
        os.remove(video_path)

        return jsonify({"message": "Download complete!", "file": save_path})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
if __name__ == "__main__":
    app.run(port=5000, debug=True)
