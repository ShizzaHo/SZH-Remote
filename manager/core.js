let ConnectingData = {
    ip: "192.168.0.172" ,
    port: "6600",
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