var express = require('express');
var router = express.Router();
var userModel = require('../models').user;

var token = function () {
    function rand() {
        return Math.random().toString(36).substr(2);
    };
    return rand() + rand();
};
function saveUser(req, res, user, callback) {
    req.session.user_id = user.id;
    res.locals.user = user;
   
    user.token = token();
    userModel.saveCookies(user, function (err) {
        res.cookie('logintoken', JSON.stringify({
            token: user.token,
            email: user.login
        }), {
            expires: new Date(Date.now() + 2 * 604800000),
            httpOnly: true
        });
        callback();
    });
}

function authenticateByCookies(req, res, next) {
    var cookie = JSON.parse(req.cookies.logintoken);
    userModel.findByUserName(cookie.email, function (err, user) {
        if (!err) {
            if (user.token == cookie.token) {
                saveUser(req, res, user, next);
                req.session.falied = false;
            } else {
                console.log("DIFFRENT TOKENS")
                req.session.falied = true;
                next();
            }
        } else {
            console.log("SESSION COOKIES USER NOT FOUND");
            req.session.falied = true;
            next();
        }
        
    });
  
}
function loadUser(req, res, next) {
    if (req.session.user_id != undefined) {
        userModel.findByID(req.session.user_id, function (err, user) {
            console.log(user);
            if (user) {
                res.locals.user = user;
                console.log("Session user LOAD");
                req.session.falied = true;
                next();
            } else {
                req.session.falied = true;
                next();
            }
        });
    } else if (req.cookies.logintoken) {
        authenticateByCookies(req, res, next);
    }   
    else {
        req.session.falied = true;
        next();
    }
}

function initUser(req, res, next) {
    console.log("Session INIT");
    userModel.findByUserName(req.body.username, function (err, user) {
        if (err) {
            console.log("User are not exist !!! Username not correct");
            req.session.falied = true;
            res.redirect('/');
            return;
        }
        if (user && user.password == req.body.password) {
            saveUser(req, res, user, next);
            req.session.falied = false;
        } else {
            console.log("User password not correct");
            req.session.falied = true;
            next();
        }
    });
}
function deleteUser(req, res, callback) {
    if (req.session) {
        userModel.clearCookies(req.session.user_id, function () { });
        res.clearCookie('logintoken');
        req.session.destroy(function () { });
        console.info("Session DELETE");
    }
    if (callback == null)
        res.redirect('/');
    else
        callback();
}


router.post('/new', function (req, res, next) {
    initUser(req, res, function () {
        loadUser(req, res, function () {
            res.redirect('/');
        });
    });
});

router.get('/logout', deleteUser);
router.use('/', loadUser);

module.exports = router;