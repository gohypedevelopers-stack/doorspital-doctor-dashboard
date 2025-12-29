const fs = require("fs");
const text = fs.readFileSync("src/pharmacy/pharmacypages/AddNewMedicine.jsx", "utf8").split("\n");
for (let i = 0; i < text.length; i += 1) {
  const line = text[i];
  if (line.includes("<Input") && !line.includes("name=")) {
    console.log(i + 1, line.trim());
  }
}
