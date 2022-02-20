function prompt(question, callback) {
    var stdin = process.stdin,
        stdout = process.stdout;

    stdin.resume();
    stdout.write(question);

    stdin.once('data', function (data) {
        callback(data.toString().trim());
    });
}

function copyFileSync( source, target ) {

    var targetFile = target;

    // If target is a directory, a new file with the same name will be created
    if ( fs.existsSync( target ) ) {
        if ( fs.lstatSync( target ).isDirectory() ) {
            targetFile = path.join( target, path.basename( source ) );
        }
    }

    fs.writeFileSync(targetFile, fs.readFileSync(source));
}


//---
const conf = require("./installpack/confuguration.js");

let colors = require('colors');
const fs = require('fs');

const userHomeData = process.env.HOME;
const userInstallerData = userHomeData+"/AppData/Roaming/.szh_remote/installer data/"

process.title = "SZH REMOTE"

const logo = `
 _____ _____    __  __           ____     ______    __  ___   ____   ______    ______
/ ___//__  /   / / / /          / __ \\   / ____/   /  |/  /  / __ \\ /_  __/   / ____/
\\__ \\   / /   / /_/ /          / /_/ /  / __/     / /|_/ /  / / / /  / /     / __/   
___/ /  / /__ / __  /          / _, _/  / /___    / /  / /  / /_/ /  / /     / /___   
/____/  /____//_/ /_/          /_/ |_|  /_____/   /_/  /_/   \\____/  /_/     /_____/   
                                                                                                                               
`

console.log(logo.rainbow);
console.log("Инсталяция | Русский выпуск | 1.0.0");
console.log("");
console.log("Подготовка к инсталяции...");
console.log("");

step1();

function step1() {
    console.log("Проверка остаточных файлов...".cyan);
    if (fs.existsSync(userInstallerData)) {
        console.log("Обнаружены остаточные файлы, установка произойдет через них.".green);
    } else {
        console.log("Остаточные файлы не обнаружены".yellow);
        console.log("Распаковка файлов...");
        
        fs.mkdirSync(userHomeData+"/AppData/Roaming/.szh_remote");
        fs.mkdirSync(userInstallerData);

        /*if (conf.dataInstall.server === true) {
            fs.mkdirSync(userHomeData+"/AppData/Roaming/.szh_remote");
            fs.mkdirSync(userInstallerData+"/server");
            copyFileSync("./installpack/server",userInstallerData+"/server");
        }
        if (conf.dataInstall.manager === true) {
            fs.mkdirSync(userInstallerData+"/manager");
            copyFileSync("./installpack/server",userInstallerData+"/manager");
        }*/
        console.log("");
        step1();
    }
}


// console.log("В установщик включены:");
// console.log("* ".green + "Сервер");
// console.log("* ".green + "Менеджер");
