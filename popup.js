document.getElementById("downloadButton").addEventListener("click", async () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length === 0) {
            alert("Error: No active tab found.");
            return;
        }
    
        let tab = tabs[0];
        if (!tab.url.includes("twitch.tv")) {
            alert("Error: This only works on Twitch.");
            return;
        }
    
        let durationInput = document.getElementById("durationInput").value.trim();
        let format = document.getElementById("formatSelect").value;
    
        if (!durationInput) {
            alert("Please enter a duration.");
            return;
        }

        let totalSeconds;
    
        if (durationInput.toLowerCase() === "full") {
            if (!confirm("Downloading the full video may take a while. Continue?")) {
                return;
            }
            totalSeconds = "full";
        } else {
            let match = durationInput.match(/^(\d+):?(\d{0,2})?$/);
            if (!match) {
                alert("Invalid format! Use MM:SS or MM.");
                return;
            }

            let minutes = parseInt(match[1], 10);
            let seconds = match[2] ? parseInt(match[2], 10) : 0;
            totalSeconds = minutes * 60 + seconds;

            if (totalSeconds <= 0) {
                alert("Cannot have 0 as a duration!");
                return;
            }
        }
    
        fetch("http://127.0.0.1:5000/download", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: tab.url, duration: totalSeconds, format })
        })
        .then(response => response.json())
        .then(result => {
            if (result.error) {
                alert("Error: " + result.error);
            } else {
                alert(result.message);
            }
        })
        .catch(error => {
            alert("Server error: Make sure server.py is running.");
        });
    });
});