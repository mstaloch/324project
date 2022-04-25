// require node module 'path' - built-in module
const path = require('path');
// require express module
const express = require('express');
// define path to static dir public
const publicDir = path.join(__dirname);
// define variable to call express methods
var app = express();
// configure express static middleware
app.use(express.static(publicDir));
// start server on port 3030 - add callback function

const port = process.env.PORT || 3030;

app.listen(port, () => {
console.log(`server running on port ${port}`);
});
