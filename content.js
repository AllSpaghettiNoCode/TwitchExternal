function addDownloadButton() {
    if (document.getElementById("mp3-download-btn")) return;

    let controls = document.querySelector(".video-player__container");
    if (!controls) return;

    let button = document.createElement("button");
    button.innerText = "Download MP3";
    button.id = "mp3-download-btn";
    button.style.position = "absolute";
    button.style.bottom = "10px";
    button.style.right = "10px";
    button.style.padding = "8px 12px";
    button.style.background = "#6441a5";
    button.style.color = "white";
    button.style.border = "none";
    button.style.cursor = "pointer";

    button.onclick = async () => {
        let videoUrl = window.location.href;

        try {
            let serverCheck = await fetch("http://127.0.0.1:5000/", { method: "GET" });
            if (!serverCheck.ok) throw new Error();
        } catch (error) {
            alert("Error: Server isnt running.\nPlease make sure 'server.py' is running and then try again.");
            return;
        }

        let userInput = prompt("Enter the duration (e.g: 10 or 15:50):", "10:00");
        if (!userInput) return;

        let match = userInput.match(/^(\d+):?(\d{0,2})?$/);
        if (!match) {
            alert("Invalid format! Please use either MM:SS format or MM.");
            return;
        }

        let minutes = parseInt(match[1], 10);
        let seconds = match[2] ? parseInt(match[2], 10) : 0;
        let totalSeconds = minutes * 60 + seconds;

        fetch("http://127.0.0.1:5000/download", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: videoUrl, duration: totalSeconds })
        }).then(response => alert("Download finished!"));
    };

    controls.appendChild(button);
}

setInterval(addDownloadButton, 3000);
