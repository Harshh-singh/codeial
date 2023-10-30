const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const env = require('./environment');

const User = require('../models/user');

//tell passport to use a new strategy for google login
passport.use(new googleStrategy({
        clientID: env.google_client_id,
        clientSecret: env.google_client_secret,
        callbackURL: env.google_callback_url
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