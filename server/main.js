//---
const Connected = require('./modules/connecting');
const Screenshot = require('./modules/screenshot');
const Command = require('./modules/command');
//---

//---
const express = require("express");
const app = express();
var cors = require('cors');
const urlencodedParser = express.urlencoded({extended: false});
app.use(cors())
//---

//---
const port = 6600;
//---

app.post("/", urlencodedParser, async function (request, response) {
    console.log(" ");
    if(!request.body) return response.sendStatus(400);
    console.log("Обработка:");
    console.log(request.body);

    if(request.body.method == "connecting"){
        Connected.check();
        response.send({msg: 'connected'});
    } else if (request.body.method == "screenshot"){
        response.send({msg: Screenshot.base64_encode(Screenshot.get())});
    } else if (request.body.method == "command"){
        console.log("Выполнение комманды 1/2");
        
        switch (request.body.option) {
            case "cmd":
                response.json({msg: await Command.CMDcommandRunner(request.body.option2)});
                break;
            case "pressKey":
                response.json({msg: await Command.pressKey(request.body.option2)});
                break;
            case "shortcut":
                response.json({msg: await Command.shortcut(request.body.option2)});
                break;
        }

    } else {
        response.json({msg: 'error'});
    }
});

app.listen(port);

async function startmessage() {
    console.log("Сервер запущен по порту: "+port);
    console.log("Используйте команду ipconfig в терминале Windows для получения Локального IP адресса");
    console.log("для подключения используйте конструкцию: \"localip:port\"");
    console.log("---");
    console.log("При возникновении проблем с подключением, попробуйте сменить порт в конфиге сервера");
}

startmessage();
