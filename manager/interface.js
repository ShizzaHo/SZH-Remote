let devicesButton = document.getElementById("devices");
let screenshotButton = document.getElementById("screenshot");
let commandSendButton = document.getElementById("commandSend");

let pages = {
    devices: document.getElementById("page_devices"),
    screenshot: document.getElementById("page_screen"),
    command: document.getElementById("page_command"),
    makro: document.getElementById("page_makro"),
}

function pageChange(selected){
    pages.devices.classList.remove("open")
    pages.screenshot.classList.remove("open")
    pages.command.classList.remove("open")
    pages.makro.classList.remove("open")
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

function connectIP() {
    let adress = document.getElementById("adress").value;
    let ip = adress.split(":")[0];
    let port = adress.split(":")[1];
    nextConnectIP(ip,port);
}