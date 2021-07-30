let express = require('express');
let app = express();
let port = 8000;

app.get('/', log, hello);
function log(req, res, next) {
    console.log(new Date(), req.method, req.url);
    next();
}
function hello(req, res, next) {
    res.write("Hello World");
    res.end();
    next();
}
app.listen(port, function () {
    console.log('server started on port 8000');
});



