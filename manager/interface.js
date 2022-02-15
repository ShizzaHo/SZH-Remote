let devicesButton = document.getElementById("devices");
let screenshotButton = document.getElementById("screenshot");
let commandSendButton = document.getElementById("commandSend");

let pages = {
    devices: document.getElementById("page_devices"),
    screenshot: document.getElementById("page_screen"),
    command: document.getElementById("page_command"),
}

function pageChange(selected){
    pages.devices.classList.remove("open")
    pages.screenshot.classList.remove("open")
    pages.command.classList.remove("open")
    selected.classList.add("open")
}

function openAlert(url, name){
    document.getElementById("alertContent").src = url;
    document.getElementById("alert").style.display = "flex";

    document.getElementById("alertTitle").innerText = name;
}

function closeAlert(){
    document.getElementById("alert").style.display = "none";
}