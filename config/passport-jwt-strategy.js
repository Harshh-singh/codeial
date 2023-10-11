const passport = require('passport');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

let opts = {
    jwtFromRequest :  ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'codeial'
}

passport.use(new JWTstrategy(opts, async function(jwt_payload, done){
    try{
      let user = await User.findById(jwt_payload._id);     

            if(user){
                return done(null,user);
            }else{
                return done(null,false);
            }
        }
    catch(err){
        console.log('Error in finding user from jwt', err);
    }

}))
       

module.exports = passport;