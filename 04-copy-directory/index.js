const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, 'files');
const destDir = path.join(__dirname, 'files-copy');

async function copyDir() {
    await fs.promises.mkdir(destDir, { recursive: true });

    const files = await fs.promises.readdir(sourceDir);

    for (const file of files) {
        const srcFile = path.join(sourceDir, file);
        const destFile = path.join(destDir, file);
        await fs.promises.copyFile(srcFile, destFile);
    }
}
copyDir().catch(err => console.error(err));