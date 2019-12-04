
var express = require('express');
var router = express.Router();
var pgclient =require('dao/pgHelper');

router.get('/', function(req, res, next) {
    if(req.cookies.islogin){

        req.session.islogin=req.cookies.islogin;
    }
    if(req.session.islogin){
        res.locals.islogin=req.session.islogin;
    }
    pgclient.select('item','','',function(result){
        if(result[0]===undefined){
            res.send('!');
        }
        else{
            res.render('users_analysis_month',{title:'月度分析',data:result,test:res.locals.islogin});
        }
    })
});

module.exports = router;