from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess as sp, os

app = Flask(__name__)
CORS(app)

DOWNLOAD_FOLDER = os.path.expanduser("~/Downloads/TwitchMP3")

if not os.path.exists(DOWNLOAD_FOLDER):
    os.makedirs(DOWNLOAD_FOLDER)

@app.route("/download", methods=["POST"])
def download():
    data = request.json
    url = data.get("url")
    duration = data.get("duration", 600)
    if not url:
        return jsonify({"error": "No URL provided"}), 400
    
    try:
        video_path = os.path.join(DOWNLOAD_FOLDER, "temp_video.mp4")
        mp3_path = os.path.join(DOWNLOAD_FOLDER, "audio.mp3")
        
        download_section = f"*0-{duration}"

        sp.run(["yt-dlp", "-f", "bestaudio", "--download-sections", download_section, "-o", video_path, url], check=True)
        sp.run(["ffmpeg", "-i", video_path, "-vn", "-b:a", "192k", mp3_path], check=True)
        os.remove(video_path)

        return jsonify({"message": "Download complete!", "file": mp3_path})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
if __name__ == "__main__":
    app.run(port=5000, debug=True)