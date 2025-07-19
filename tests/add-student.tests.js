const assert = require('assert');

const axios = require('axios');


suite('Add Students page', function() {
  test('Page title', async function() {
    let res = await axios.get("http://localhost:8080/add-student");
    let body = await res.data;
    assert.ok(body.includes("<h1>Register New Student</h1>"));
  });

  test('Students HTML form', async function() {
    let res = await axios.get("http://localhost:8080/add-student");
    let body = await res.data;
    
    let nameFieldFound = body.includes('<input id="name" type="text" name="name"/>');
    assert.ok(nameFieldFound, "Field 'name' is missing");

    let emailFieldFound = body.includes('<input id="email" type="email" name="email"/>');
    assert.ok(emailFieldFound, "Field 'email' is missing");

    let buttonAddFound = body.includes('<button type="submit">Add</button>');
    assert.ok(buttonAddFound, "Button [Add] is missing");
  });

  test('Add valid student', async function() {
    let res = await axios.post("http://localhost:8080/add-student", 
  "name=Peter&email=peter%40gmail.com", 
  {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
});

    let body = await res.data;
    let studentsReturned = body.includes(
		"<ul><li>Steve (steve@gmail.com)</li><li>Tina (tina@yahoo.com)</li><li>Peter (peter@gmail.com)</li></ul>");
    assert.ok(studentsReturned, "Add student failed");
  });

  test('Add invalid student', async function() {
    let res = await axios.post("http://localhost:8080/add-student", 
  "name=Peter&email=peter%40gmail.com", 
  {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
});

    let body = await res.data;
    let errMsg = body.includes("Cannot add student. Name and email fields are required!");
    assert.ok(errMsg, "Add invalid student should display an error message");

    res = await axios.get("http://localhost:8080/");
    body = await res.data;
	assert.ok(body.includes("Registered students: <b>2</b>"), 
		"Add invalid student should not change the students count");
  });
});
