function addDownloadButton() {
    if (document.getElementById("mp3-download-btn")) return;

    let controls = document.querySelector(".video-player__container");
    if (!controls) return;

    let button = document.createElement("button");
    button.innerText = "Download Audio";
    button.id = "mp3-download-btn";
    button.style.position = "absolute";
    button.style.bottom = "10px";
    button.style.right = "400px";
    button.style.padding = "8px 12px";
    button.style.background = "#6441a5";
    button.style.color = "white";
    button.style.border = "none";
    button.style.cursor = "pointer";

    button.onclick = async () => {
        let videoUrl = window.location.href;

        let userInput = prompt("Enter the duration (e.g: 10 or 15:50), or type 'full' to download the full audio:", "10:00");
        if (!userInput) return;

        let totalSeconds;
        if (userInput.toLowerCase() === "full") {
            let confirmFull = confirm("Downloading the full audio will take a while. Do you wish to continue?");
            if (!confirmFull) return;
            totalSeconds = "full";
        } else {
            let match = userInput.match(/^(\d+):?(\d{0,2})?$/);
            if (!match) {
                alert("Invalid format! Please use either MM:SS format or MM.");
                return;
            }

            let minutes = parseInt(match[1], 10);
            let seconds = match[2] ? parseInt(match[2], 10) : 0;
            totalSeconds = minutes * 60 + seconds;

            if (totalSeconds <= 0) {
                alert("Duration must be more than 0 seconds!");
                return;
            }
        }

        let format = prompt("Enter audio format to download audio as (mp3, wav, ogg, flac):", "mp3").toLowerCase();
        let validFormats = ["mp3", "wav", "ogg", "flac"];
        if (!validFormats.includes(format)) {
            alert("Invalid format!");
            return;
        }

        fetch("http:/localhost:5000/download", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: videoUrl, duration: totalSeconds, format: format })
        })
        .then(response => {
            if (!response.ok) throw new Error(`Server error: ${response.statusText}`);
            return response.json();
        })
        .then(data => alert(data.message || "Download started!"))
        .catch(error => alert("Error downloading: " + error.message));
    };

    controls.appendChild(button);
}

setInterval(addDownloadButton, 3000);
