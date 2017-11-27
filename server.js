const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path')
const port = 8000;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'jamesbond007' }))
app.use(express.static(path.join(__dirname, '/static')));
app.set('views'.__dirname + '/views');
app.set('view engine', 'ejs');
app.get('/', function (req, res) {
    if(!req.session.num) {
        res.redirect('/reset');
    } else {
        let info = {
            "text": req.session.text,
            "style": req.session.style,
            "style2": req.session.style2,
            "style3": req.session.style3
        }
        res.render('index', info);
        res.end();
    }
});
app.post('/guess', function(req, res) {
    if (!req.session.num) {
        res.redirect('/reset');
    } else {
        let guess = req.body.guess;
        if(guess > req.session.num) {
            req.session.text = 'Too high!';
            req.session.style = 'class=red';
        } else if (guess < req.session.num) {
            req.session.text = 'Too low!';
            req.session.style = 'class=red';
        } else {
            req.session.text = `${guess} was the number!`;
            req.session.style = 'class=green';
            req.session.style2 = '';
            req.session.style3 = 'class=hidden';
        }
        res.redirect('/');
    }
});
app.get('/reset', function(req, res) {
    req.session.num = Math.floor(Math.random() * 100 + 1);
    req.session.text = '';
    req.session.style = 'class=hidden';
    req.session.style2 = 'class=hidden';
    req.session.style3 = ''
    res.redirect('/');
}) 
app.listen(port, function () {
    console.log(`listening on port ${port}`);
});