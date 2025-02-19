function addDownloadButton() {
    if (document.getElementById("mp3-download-btn")) return;

    let controls = document.querySelector(".video-player__container");
    if (!controls) return;

    let button = document.createElement("button");
    button.innerText = "Download Audio";
    button.id = "mp3-download-btn";
    button.style.position = "absolute";
    button.style.bottom = "10px";
    button.style.right = "10px";
    button.style.padding = "8px 12px";
    button.style.background = "#6441a5";
    button.style.color = "white";
    button.style.border = "none";
    button.style.cursor = "pointer";

    button.onclick = () => chrome.runtime.sendMessage({ action: "openPopup "});

    controls.appendChild(button);
}

if (window.location.href.includes("twitch.tv")) {
    setInterval(addDownloadButton, 3000);
}
