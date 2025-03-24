function checkServerStatus() {
    const serverStatusElement = document.getElementById("serverStatus");

    fetch("http://localhost:5000/download", {
        method: "OPTIONS"
    })
    .then(response => {
        if (response.ok) {
            serverStatusElement.textContent = "server.py status: enabled";
            serverStatusElement.classList.add("enabled");
            serverStatusElement.classList.remove("disabled");
        } else {
            throw new Error("Server isnt reponding!");
        }
    })
    .catch(error => {
        serverStatusElement.textContent = "server.py status: disabled";
        serverStatusElement.classList.add("disabled");
        serverStatusElement.classList.remove("enabled");
    });
}

document.addEventListener("DOMContentLoaded", checkServerStatus);

setInterval(checkServerStatus, 5000);