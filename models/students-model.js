const fs = require('fs');

let initialStudents = JSON.parse(
  fs.readFileSync('./models/students.json'));
let students = JSON.parse(JSON.stringify(initialStudents));

function resetStudents() {
  students.length = 0;
  initialStudents.forEach(s => students.push({...s}));
}

module.exports = { students, resetStudents };
