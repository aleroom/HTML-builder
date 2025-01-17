const fs = require('fs');
const path = require('path');

let filePath = path.join(__dirname, 'text.txt');

let readStream = fs.createReadStream(filePath, 'utf-8');
readStream.on('data', (chunk) => {
    console.log(chunk);
});

readStream.on('error', (err) => {
    console.error('Ошибка при чтении файла:', err);
});