const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');

const User = require('../models/user');

//tell passport to use a new strategy for google login
passport.use(new googleStrategy({
        clientID: "197817596332-tiikmdher2vvspqmbjlrhjo8cfdgk7k1.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:8000/users/auth/google/callback"
 }, 
 async function(accessToken, refreshToken, profile, done){
    //find a user
    try{
    const user = await User.findOne({email: profile.emails[0].value}).exec()
        
            if(user){
                return done(null,user);
            }else{
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex'),
                });
                    return done(null, user);
               
            }
        }catch(err){
            if(err){
                console.log('Error in google passport strategy', err);
                return;
               
            }
        }
       
        console.log(profile);

       
 }

));

module.exports = passport;