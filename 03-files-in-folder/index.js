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
            if(stats.isFile()) {
                const ext = path.extname(file).slice(1);
                const name = path.basename(file, ext ? `.${ext}` : '');
                const sizeInKb = (stats.size / 1024);
                console.log(`${name} - ${ext} - ${sizeInKb} bytes`);
            }                      
        });
    });
});