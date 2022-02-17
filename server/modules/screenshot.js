const screenshot = require('screenshot-desktop')
const fs = require('fs');

function get() {
    screenshot({ filename: 'Last_Screenshot.jpg' }).then((imgPath) => {
        console.log("Отправка скриншота");
        return "/Last_Screenshot.jpg";
    }).catch((err) => {
        console.log("ОШИБКА.");
    })
}


function base64_encode(file) {
    return fs.readFileSync('./Last_Screenshot.jpg', 'base64');
}

module.exports = {
    get: get,
    base64_encode: base64_encode,
}