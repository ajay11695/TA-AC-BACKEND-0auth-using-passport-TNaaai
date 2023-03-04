var passport = require('passport')
require('dotenv').config()
var githubStrategy = require('passport-github').Strategy
var googleStrategy = require('passport-google-oauth2').Strategy
var User = require('../model/User')


// login with github
passport.use(new githubStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: '/auth/github/callback'
}, (accessToken, refreshToken, profile, done) => {
    // console.log(profile)
    var profileData = {
        name: profile.displayName,
        username: profile.username,
        email: profile._json.email,
        photo: profile._json.avatar_url
    }
    User.findOne({ email: profile._json.email })
        .then((user) => {
            // console.log( !user)
            if (!user) {
                User.create(profileData)
                    .then((adduser)=>{
                        console.log(adduser)
                        return done(null,adduser)
                    }).catch((err)=>{
                       return  done(err)
                    })
            }
          return  done(null, user)
        })
        .catch((err)=>{
            done(err)
        })
}
))

// login with google

passport.use(new googleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  function( accessToken, refreshToken, profile, done) {
    console.log(profile)
    var profileData = {
        name: profile.displayName,
        username: profile.id,
        email: profile.email,
        photo: profile.picture
    }
    User.findOne({ email: profile.email })
        .then((user) => {
            // console.log( !user)
            if (!user) {
                User.create(profileData)
                    .then((adduser)=>{
                        console.log(adduser)
                        return done(null,adduser)
                    }).catch((err)=>{
                       return  done(err)
                    })
            }
          return  done(null, user)
        })
        .catch((err)=>{
            done(err)
        })
  }
));

passport.serializeUser((user,done)=>{
    done(null,user.id)
})

passport.deserializeUser((id,done)=>{
    User.findById(id,'name email username')
    .then((user)=>{
        done(null,user)
    })
})