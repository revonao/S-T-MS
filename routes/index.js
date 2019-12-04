var express = require('express');
var router = express.Router();
var pgclient = require('dao/pgHelper');
var cors = require('cors');
router.use(cors());
pgclient.getConnection();
/* GET home page. */
router.get('/', function (req, res) {
    if (req.cookies.islogin) {
        req.session.islogin = req.cookies.islogin;
    }
    if (req.session.islogin) {
        res.locals.islogin = req.session.islogin;
    }
    res.render('index', {title: 'Index', test: res.locals.islogin});
});
router.route('/login')
    .get(function (req, res) {
        if (req.session.islogin) {
            res.locals.islogin = req.session.islogin;
        }
        if (req.cookies.islogin) {
            req.session.islogin = req.cookies.islogin;
        }
        res.render('login', {title: '用户登录', test: res.locals.islogin});
    })
    .post(function (req, res) {
        result = null;
        //pg.selectFun(client,req.body.username, function (result) {
        pgclient.select('userinfo', {'username': req.body.username}, '', function (result) {
            if (result[0] === undefined) {
                res.send('没有该用户');
            } else {
                if (result[0].password === req.body.password) {
                    req.session.islogin = req.body.username;
                    res.locals.islogin = req.session.islogin;
                    res.cookie('islogin', res.locals.islogin, {maxAge: 60000});
                    //res.send("登陆成功");
                    res.redirect('/users');
                } else {
                    res.send("请重试");
                    //res.redirect('/login');
                }
            }
        });
    });
router.get('/logout', function (req, res) {
    res.clearCookie('islogin');
    req.session.destroy();
    res.redirect('/');
});

router.route('/reg')
    .get(function (req, res) {
        res.render('reg', {title: '注册'});
    })
    .post(function (req, res) {
        pgclient.select('userinfo', {'username': req.body.username}, '', function (result) {
            if (result[0] === undefined) {
                if (req.body.password === req.body.password2) {
                    pgclient.save('userinfo', {
                            'username': req.body.username,
                            'password': req.body.password2,
                            'email': req.body.email,
                            'telephone': req.body.telephone,
                            'longitude': req.body.longitude,
                            'latitude': req.body.latitude
                        },
                        function (err) {
                            pgclient.select('userinfo', {'username': req.body.username}, '', function (result) {
                                if (result[0] === undefined) {
                                    res.send('<p>注册没有成功，请重新注册<a href="/reg">重新注册。</a></p>');
                                } else {
                                    res.send('<p>注册成功！<a href="/login">点击跳转至登录页面。</a></p>')
                                    //res.redirect('/login');
                                }
                            });
                        });
                } else {
                    res.send('<p>密码输入不一致！<a href="/reg">点击返回注册页面。</a></p>');
                }
            } else {
                res.send('<p>用户名已被注册！<a href="/reg">点击返回注册页面。</a></p>');
            }
        });
    });

module.exports = router;

