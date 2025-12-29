const fs = require("fs");
const path = require("path");
const root = path.resolve("src");
const exts = [".jsx", ".tsx", ".js", ".ts"];
const pattern = /<(input|select|textarea)([^>]*)>/gi;
function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else if (exts.includes(path.extname(entry.name))) {
      checkFile(full);
    }
  }
}
function checkFile(file) {
  const text = fs.readFileSync(file, "utf8");
  let match;
  while ((match = pattern.exec(text)) !== null) {
    const attrs = match[2];
    if (!attrs.includes("id=") && !attrs.includes("name=")) {
      console.log(
        `${file}:${match.index} ${match[1].toLowerCase()} missing id/name -> ${match[0]}`
      );
    }
  }
}
walk(root);
