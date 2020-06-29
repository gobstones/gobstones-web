const fs = require("fs");

const scriptFileName = __filename.split("/").slice(-1).join("");
const files = fs
  .readdirSync(".")
  .filter((it) => it !== scriptFileName);

console.log("SET THIS AS Blockly.AVAILABLE_ICONS (at the beggining of gobstones-blocks.js):\n");
console.log(JSON.stringify(files));
