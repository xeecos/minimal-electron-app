const shell = require("shelljs");
const fs = require("fs");
const path = require("path");
const packageJson = require("../src/package.json");

let targetDir = path.join(__dirname,`../releases/${packageJson.name}-win32-ia32/resources/node_modules`);
if(!fs.existsSync(targetDir))
{
    fs.mkdirSync(targetDir,{ recursive: true });
}
shell.cp("-rf","./libs/win/*",targetDir)