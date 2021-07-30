let express = require('express');
let expressLayouts = require('express-ejs-layouts')
let app = express();
let port = 8000;


app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/img', express.static(__dirname + 'public/img'));

// app.use(expressLayouts)
app.set('views', './public/views')
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(port, function () {

    console.info(`App listening on port ${port}`);

});