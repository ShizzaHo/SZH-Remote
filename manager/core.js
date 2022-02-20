// let ConnectingData = {
//     ip: "192.168.0.172" ,
//     port: "6600",
// }

let ConnectingData = {
    ip: "" ,
    port: "",
}

window.onload = function() {
    if(localStorage.lastConnectedIP != undefined){
        ConnectingData.ip = localStorage.lastConnectedIP;
        ConnectingData.port = localStorage.lastConnectedPORT;
    
        nextConnectIP(ConnectingData.ip,ConnectingData.port);
    }
}

function nextConnectIP(ip,port) {
    ConnectingData.ip = ip;
    ConnectingData.port = port;

    document.getElementById("connectStatus").innerText = "Ошибка подключения к "+ConnectingData.ip+":"+ConnectingData.port;
    $.ajax({
        crossDomain: true,
        url: "http://"+ConnectingData.ip+':'+ConnectingData.port+"/",      
        method: 'post',     
        dataType: 'json',         
        data: {method: 'connecting'},     
        success: (function (response) {
            let adress = document.getElementById("connectStatus").innerText = "Успешно подключен к "+ConnectingData.ip+":"+ConnectingData.port;
            localStorage.setItem("lastConnectedIP",ConnectingData.ip);
            localStorage.setItem("lastConnectedPORT",ConnectingData.port);
        }),
        error: function (error) {
            document.getElementById("connectStatus").innerText = "Ошибка подключения к "+ConnectingData.ip+":"+ConnectingData.port;
        }
    });
}

function getScreenshot() {
    document.getElementById("loader").classList.remove("closed");
    document.getElementById("screenshotResult").classList.add("closed");
    
    $.ajax({
        crossDomain: true,
        url: "http://"+ConnectingData.ip+':'+ConnectingData.port+"/",      
        method: 'post',     
        dataType: 'json',         
        data: {method: 'screenshot'},     
        success: (function (response) {
            document.getElementById("loader").classList.add("closed");
            document.getElementById("screenshotResult").classList.remove("closed");
            console.log(response.msg);
            document.getElementById("screenshotResult").src = "data:image/png;base64,"+response.msg;
        })
    });
}

async function sendCommand() {
    document.getElementById("commandResult").innerText = "Статус: Подготовка"
    let command = document.getElementById("commandBox").value;
    let type = command.split(":")[0];
    let method = command.split("\"")[1];
    document.getElementById("commandResult").innerText = "Статус: Отправка..."

    $.ajax({
        crossDomain: true,
        url: "http://"+ConnectingData.ip+':'+ConnectingData.port+"/",        
        method: 'post',             
        dataType: 'json',         
        data: {method: 'command', option: ''+type+'', option2: ''+method+''},     
        success: (function (response) {
            document.getElementById("commandResult").innerText = "Статус: Успешно выполнено!"
            if(response.msg != ""){
                alert(JSON.stringify(response.msg));
            }
        })
    });
}

function sendCommandSpecial(value) {
    document.getElementById("commandBox").value = value;
    sendCommand()
}