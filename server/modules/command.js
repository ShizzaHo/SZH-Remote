const { exec } = require("child_process");
const robot = require('robotjs');

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

module.exports = {
    CMDcommandRunner: CMDcommandRunner,
    shortcut: shortcut,
    pressKey: pressKey,
}