const fs = require('fs').promises;
const path = require('path');

async function buildPage() {
    await fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true });

    const templatePath = path.join(__dirname, 'template.html');
    let template = await fs.readFile(templatePath, 'utf-8');

    const componentsDir = path.join(__dirname, 'components');
    const componentFiles = await fs.readdir(componentsDir);

    for (const file of componentFiles) {
        const componentName = path.parse(file).name;
        const componentPath = path.join(componentsDir, file);
        const componentContent = await fs.readFile(componentPath, 'utf-8');
        const regex = new RegExp(`{{${componentName}}}`, 'g');
        template = template.replace(regex, componentContent);
    }

    await fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), template);

    const stylesDir = path.join(__dirname, 'styles');
    const styleFiles = await fs.readdir(stylesDir);
    const styleContent = [];

    for (const file of styleFiles) {
        if (path.extname(file) === '.css') {
            const stylePath = path.join(stylesDir, file);
            const style = await fs.readFile(stylePath, 'utf-8');
            styleContent.push(style);
        }
    }

    await fs.writeFile(path.join(__dirname, 'project-dist', 'style.css'), styleContent.join('\n'));

    const assetsDir = path.join(__dirname, 'assets');
    const projectAssetsDir = path.join(__dirname, 'project-dist', 'assets');
    await copyDirectory(assetsDir, projectAssetsDir);
}

async function copyDirectory(src, dest) {
    await fs.mkdir(dest, { recursive: true });
    const items = await fs.readdir(src);

    for (const item of items) {
        const srcPath = path.join(src, item);
        const destPath = path.join(dest, item);
        const stat = await fs.stat(srcPath);

        if (stat.isDirectory()) {
            await copyDirectory(srcPath, destPath);
        } else {
            await fs.copyFile(srcPath, destPath);
        }
    }
}

buildPage().catch(console.error);