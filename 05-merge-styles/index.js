const fs = require('fs');
const path = require('path');

const stylesDir = path.join(__dirname, 'styles');
const outputDir = path.join(__dirname, 'project-dist');
const outputFile = path.join(outputDir, 'bundle.css');

fs.mkdir(outputDir, { recursive: true }, (err) => {
  if (err) throw err;

  fs.writeFile(outputFile, '', (err) => {
    if (err) throw err;

    fs.readdir(stylesDir, (err, files) => {
      if (err) throw err;

      files.forEach(file => {
        const filePath = path.join(stylesDir, file);
        const fileExt = path.extname(file);

        if (fileExt === '.css') {
          fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) throw err;

            fs.appendFile(outputFile, data + '\n', (err) => {
              if (err) throw err;
            });
          });
        }
      });
    });
  });
});