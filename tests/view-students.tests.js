const assert = require('assert');

const axios = require('axios');


suite('View Students page', function() {
  setup(async function() {
    await axios.post('http://localhost:8080/__reset');
  });

  test('Page title', async function() {
    let res = await axios.get("http://localhost:8080/students");
    let body = await res.data;
    assert.ok(body.includes("<h1>Registered Students</h1>"));
  });
  
  test('Students list', async function() {
    let res = await axios.get("http://localhost:8080/students");
    let body = await res.data;
    assert.ok(body.includes("<ul><li>Steve (steve@gmail.com)</li><li>Tina (tina@yahoo.com)</li></ul>"));
  });
});
