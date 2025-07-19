const assert = require('assert');
const axios = require('axios');



suite('Home page', function() {
  test('Page title', async function() {
    let res = await axios.get("http://localhost:8080/");
    let body = await res.data;
    assert.ok(body.includes("<h1>Students Registry</h1>"));
  });
  
  test('Students count', async function() {
    let res = await axios.get("http://localhost:8080/");
    let body = await res.data;
    assert.ok(body.includes("Registered students: <b>2</b>"));
  });
});
