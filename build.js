const fs = require("fs");
const path = require("path");
const uglifyjs = require("uglify-js");

let css = "";
let js = "";

function handleFolder(folderPath, excludingFileName) {
  // 读取文件夹中的所有文件和子文件夹
  fs.readdirSync(folderPath).forEach((item) => {
    const itemPath = path.join(folderPath, item);
    if (fs.statSync(itemPath).isDirectory()) {
      handleFolder(itemPath, excludingFileName);
    } else {
      if (item !== excludingFileName) {
        const fileContent = fs.readFileSync(itemPath, "utf8");
        if (item.includes(".css")) css += fileContent + "\r\n";
        if (item.includes(".js")) js += fileContent + "\r\n";
      }
    }
  });
}

function build() {
  handleFolder("./src", "main.js");
  css = css.replace(/\r\n/g, "");
  let template = fs.readFileSync("./src/main.js", "utf8");
  template = template.replace("/*编译器标记 勿删*/", css).replace("// 编译器标记 勿删", js);

  if (!fs.existsSync("./dist")) fs.mkdirSync("./dist");
  fs.writeFileSync("./dist/douyuex.js", template);

  let header = "";
  header = fs.readFileSync("./src/main.js", "utf8").split("// ==/UserScript==")[0];
  header += "// ==/UserScript==\r\n";

  const result = uglifyjs.minify(template);
  fs.writeFileSync("./dist/douyuex.user.js", header + result.code);
}

build();
