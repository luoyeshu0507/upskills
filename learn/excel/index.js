const XLSX = require('xlsx');
const workbook = XLSX.readFile('./03b1fc1de767625a7d7aa993f054ccbf');
console.log(workbook.Sheets[workbook.SheetNames[0]]);
console.log(XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]));

// let ws = XLSX.utils.aoa_to_sheet([
//   "SheetJS".split(""),
//   [1,2,3,4,5,6,7],
//   [2,3,4,5,6,7,8]
// ]);
// console.log(ws);

// let wb = XLSX.utils.book_new();
// XLSX.utils.book_append_sheet(wb, ws, 'sheet1');

// console.log(wb);
// XLSX.writeFile(wb, __dirname + '/test-xx/out-1.xlsx');