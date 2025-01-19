const fs = require('fs');
const path = require('path');

const secretFolder = path.join(__dirname, 'secret-folder');

fs.readdir(secretFolder, (err, files) => {
    if (err) {
        return console.error('Ошибка при чтении содержимого папки:', err);
    }

    files.forEach((file) => {
        const filePath = path.join(secretFolder, file);
        fs.stat(filePath, (err, stats) => {
            if (err) {
                return console.error('Ошибка при получении информации о файле:', err);
            }   
            console.log(`${file} - ${stats.size} bytes`);
        });
    });
});