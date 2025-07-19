const assert = require('assert');
const axios = require('axios');




suite('About page', function() {
  test('Page title', async function() {
    let res = await axios.get("http://localhost:8080/about");
    let body = await res.data;
    assert.ok(body.includes("<title>About</title>"));
    assert.ok(body.includes("<h1>About</h1>"));
  });
});
