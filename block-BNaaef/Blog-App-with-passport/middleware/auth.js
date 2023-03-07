var User = require('../model/User')
var passport=require('passport')

module.exports = {
    loggedInUser: (req, res, next) => {

        if ((req.session && req.session.userId) || req.session.passport.user ) {
            next()
        } else {
            res.redirect('/users/login')
        }
    },

    userInfo: (req, res, next) => {
        var userId = (req.session && req.session.userId)
        var userId2 = (req.session && req.session.passport)
        if (userId) {
            User.findById(userId, 'name email', (err, user) => {
                if (err) return next(err)
                req.user = user
                res.locals.user = user
               return next()
            })
        }else if(userId2){
            User.findById(userId2.user, 'name email', (err, user) => {
                if (err) return next(err)
                req.user = user
                res.locals.user = user
               return next()
            })
        }else{
            req.user = null
                res.locals.user = null
                next()
        }
    }
}