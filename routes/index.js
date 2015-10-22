'use strict';
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    let s_time = 1446118278417;
    let current_time = new Date().getTime();
    var difference = ((s_time - current_time)/1000);
    difference = Math.round(difference);
    res.render('index', {time: difference});
});

router.get('/selections', function (req, res) {
	res.render('general', { csrfToken: req.csrfToken() });
});

router.get('/login', function(req, res) {
  res.render('login', {csrfToken: req.csrfToken()});
});

router.post('/login', function (req, res) {
  let collection = req.db.collection('admin');
    const onFetch = function (err, doc) {
        if (!err) {
            if (doc && (bcrypt.compareSync(req.body.password, doc.password))) {
                res.cookie('username', req.body.username, {maxAge: 86400000, signed: true});
                console.log('equal');
                res.redirect('/admin');
            }
            else {
                res.redirect('/login');
            }
        }
    };
    collection.findOne({username: req.body.username}, onFetch);
});

router.get('/logout', function (req, res) {
    if (req.signedCookies.username) {
        res.clearCookie('username', {});
        res.redirect('/login');
    }
    else {
        res.redirect('/');
    }
});

module.exports = router;
