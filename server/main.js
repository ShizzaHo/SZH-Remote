const screenshot = require('screenshot-desktop')
const { exec } = require("child_process");
const robot = require('robotjs');

const fs = require('fs');

const express = require("express");
const app = express();
var cors = require('cors')
const urlencodedParser = express.urlencoded({extended: false});
app.use(cors())

const port = 6600;

app.post("/", urlencodedParser, async function (request, response) {
    console.log(" ");
    if(!request.body) return response.sendStatus(400);
    console.log("Обработка:");
    console.log(request.body);

    if(request.body.method == "connecting"){
        console.log("Подключено.");
        response.send({msg: 'connected'});
    } else if (request.body.method == "screenshot"){
        
        screenshot({ filename: 'Last_Screenshot.jpg' }).then((imgPath) => {
            console.log("Отправка скриншота");
            response.send({msg: base64_encode("/Last_Screenshot.jpg")});
        }).catch((err) => {
            console.log("ОШИБКА.");
        })

    } else if (request.body.method == "command"){
        console.log("Выполнение комманды 1/2");
        
        if(request.body.option == "cmd"){
            response.json({msg: await CMDcommandRunner(request.body.option2)});
        } else if (request.body.option == "pressKey"){
            response.json({msg: await pressKey(request.body.option2)});
        } else if (request.body.option == "shortcut"){
            response.json({msg: await shortcut(request.body.option2)});
        }

    } else {
        response.json({msg: 'error'});
    }
});

function base64_encode(file) {
    return fs.readFileSync('./Last_Screenshot.jpg', 'base64');
}

async function CMDcommandRunner(command) {
    console.log("Выполнение комманды 2/2");

    let promise = new Promise((resolve, reject) => {
        
        exec(command, (error, stdout, stderr) => {
            if (error) {
              resolve(error.message)
            }
          
            if (stderr) {
              resolve(stderr)
            }
            resolve(stdout)

        });

    });
    
    return await promise;
}

async function shortcut(command) {
    console.log("Выполнение комманды 2/2");

    let command_cut = command.split(",");

    console.log(JSON.stringify(command_cut));

    let promise = new Promise((resolve, reject) => {
        let key = command_cut[command_cut.length-1];
        command_cut.pop();

        robot.keyTap(key, command_cut);

        resolve("OK")
    });
    
    return await promise;
}

async function pressKey(command) {
    console.log("Выполнение комманды 2/2");

    let promise = new Promise((resolve, reject) => {
        robot.keyTap(command);
        resolve("OK")
    });

    return await promise;
}

app.listen(port);

async function startmessage() {
    console.log("Сервер запущен по порту: "+port);
    console.log("Используйте команду ipconfig в терминале Windows для получения Локального IP адресса");
    console.log("для подключения используйте конструкцию: \"localip:port\"");
    console.log("---");
    console.log("При возникновении проблем с подключением, попробуйте сменить порт в конфиге сервера");
}

startmessage();
