const fs = require('fs');
const path = require('path');
const readLine = require('readline');

let filePath = path.join(__dirname, 'text.txt');
const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('Привет! Пожалуйста, введите текст, который вы хотите записать в файл');

rl.on('line', (line) => {
    fs.writeFile(filePath, line, (err) => {
        if (err) {
            console.error('Ошибка при записи текста в файл:', err);
           
        } else {
            console.log('Текст успешно записан в файл');
        }
        
        rl.close();
    });
})