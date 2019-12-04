var express = require('express');
var router = express.Router();
var pgclient = require('dao/pgHelper');

router.route('/')
    .get(function (req, res) {
        if (req.cookies.islogin) {
            req.session.islogin = req.cookies.islogin;
        }
        if (req.session.islogin) {
            res.locals.islogin = req.session.islogin;
        }
        pgclient.select('userinfo', {username: res.locals.islogin}, '', function (result) {
            if (result[0] === undefined) {
                res.send('!');
            } else {
                res.render('home', {title: 'Home', data: result, test: res.locals.islogin});
            }
        });
    })
    .post(function (req, res) {
        if (req.cookies.islogin) {
            req.session.islogin = req.cookies.islogin;
        }
        if (req.session.islogin) {
            res.locals.islogin = req.session.islogin;
        }
        pgclient.update('userinfo', {username: res.locals.islogin}, {
            'firstname': req.body.firstname,
            'lastname': req.body.lastname,
            'password': req.body.password,
            'email': req.body.email,
            'address': req.body.address,
            'longitude': req.body.longitude,
            'latitude': req.body.latitude
        }, function (result) {
            res.redirect('/users');
            console.log(result);
        });
    });

module.exports = router;
