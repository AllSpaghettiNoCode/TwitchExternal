
![Logo](https://i.ibb.co/RZ99wzD/Scree-1.png)


# TwitchExternal

TwitchExternal is a program written in both JS (extension-side) and Python (server-side). This extension/server combo is designed for downloading Twitch videos from any creator as an mp3, with the ability to adjust the duration of the output audio if the video is too long.


## Features

- MP3 audio download, with support for WAV, OGG, and FLAC as well.
- An easy way to adjust the duration or download the full audio.
- Customizible output download path.
- 100% free and safe (only saved locally on your machine, never anywhere else).


## Installation (extension)

Download latest release (or zip).

**Depending on your browser**, visit the following:

For Chrome:

```bash
  chrome://extensions
```
For Opera (or Opera GX):
```bash
  opera://extensions
```

Click on the "Developer Mode" switch, this should give you access to load an unpacked extension. Navigate to the folder where you have the zip installed (should have manifest.json) and select the folder. The extension part of the installation is done.

**Whenever the extension and/or server gets an update, you will need to click the "Reload" and "Update" button to make sure the latest version is implemented.**



## Installation (server)

Download latest release (or zip).

Download Python 3.8.x (I personally use 3.8.6, but any should work).

Install these packages below, this installs Flask and Flask CORS to handle cross-origin requests for Chromium browsers:


```python
  pip install flask yt-dlp ffmpeg-python flask-cors
```

Thats it, now just run:
```python
  python .\server.py
```
and find the "Download Audio" button on any video! Happy downloading!
## FAQ

#### Is this against Twitch TOS? Will I get banned?

While yes, downloading any sort of video is against Twitch's TOS, this extension server hybrid only saves the audio locally to your computer. Twitch themselves have not (as far as I know) banned anyone for downloading other streamers videos, but again, this only saves audio files to your computer, you can delete them at any time and Twitch will not know, nor will the streamer.

#### Is this "server.py" file safe?

Yes, it is using a very well-known library called Flask to open a local connection on **your** machine, not anyone elses. 

#### Do I need to keep server.py running if I want to download a video?

Yes, any time you want to download a video, you will need to run server.py. **However**, the extension itself can stay installed, *as long as you keep the folder on your desktop.*

#### What is the connection going to, I dont want random people to see my connection info!

The connection opens on "localhost" or "127.0.0.1", aka **your own IP address**. No one else will see your connection, this is all on your own machine.


## Support

If you encounter any issues, open an issue in this repo with the error message you are receiving, as well as any screenshots if possible. This is my first extension, so issues are to be expected for the first release.

