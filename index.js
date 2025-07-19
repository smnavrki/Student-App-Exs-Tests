const fetch = require('node-fetch');
global.fetch = require('node-fetch');

const express = require('express');
const app = express();
app.set('view engine', 'pug');
app.use(require('body-parser')
  .urlencoded({extended:true}));

const studentsController = 
  require("./controllers/students-controller");

const studentsModel = require("./models/students-model");
let students = studentsModel.students;

studentsController.setup(app, students);

// Expose resetStudents for tests
app.locals.resetStudents = studentsModel.resetStudents;

let port = process.argv[2];
if (!port) port = process.env['PORT'];
if (!port) port = 8080;

app.listen(port, () => {
  console.log(`App started. Listening at http://localhost:${port}`);
})
.on('error', function(err) {
  if (err.errno === 'EADDRINUSE')
    console.error(`Port ${port} busy.`);
  else 
    throw err;
});
