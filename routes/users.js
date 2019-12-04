var express = require('express');
var router = express.Router();
var pgclient = require('dao/pgHelper');

router.get('/', function (req, res, next) {
    if (req.cookies.islogin) {

        req.session.islogin = req.cookies.islogin;
    }
    if (req.session.islogin) {
        res.locals.islogin = req.session.islogin;
    }
    pgclient.select('item', '', '', function (result) {
        if (result[0] === undefined) {
            res.send('!');
        } else {
            res.render('users', {title: '仓库', data: result, test: res.locals.islogin});
        }
    })
});

router.post('/entry', function (req, res) {
    if (req.cookies.islogin) {

        req.session.islogin = req.cookies.islogin;
    }
    if (req.session.islogin) {
        res.locals.islogin = req.session.islogin;
    }
    pgclient.select('item', {'id': req.body.id}, '', function (result) {
        if (result[0] === undefined) {
            pgclient.save('item', {
                            'id': req.body.id,
                            'name': req.body.name,
                            'class': req.body.class,
                            'quantity': req.body.quantity,
                            'seller': req.body.seller,
                            'price': req.body.price
                        },
                        function (err) {
                            pgclient.select('item', {'id': req.body.id}, '', function (result) {
                                if (result[0] === undefined) {
                                    res.send('<p>入库没有成功，<a href="/users">重新入库。</a></p>');
                                } else {
                                    res.redirect('/users');
                                }
                            });
                });
        } else {
            //pgclient.update();
        }
    });
});

module.exports = router;