const xlsx = require('node-xlsx').default;

// Parse a buffer
// const workSheetsFromBuffer = xlsx.parse(fs.readFileSync(`${__dirname}/myFile.xlsx`));
// Parse a file
console.log(__dirname);
const workSheetsFromFile = xlsx.parse(`${__dirname}/test.xlsx`);
console.log(workSheetsFromFile);