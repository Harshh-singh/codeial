const User = require('../../../models/user');
const jwt = require('jsonwebtoken');
const env = require('../../../config/environment');

module.exports.createSession = async function(req,res){
    try{        
    
        let user = await User.findOne({email: req.body.email}); 
        
        if(!user || user.password!=req.body.password){
            return res.json(422,{
                message: 'invalid username or password'
            });
        }

        return res.status(200).json({
            message: 'sign in successfull, here is your token, please keep it safe!',
            data: {
                token: jwt.sign(user.toJSON(), env.jwt_secret , {expiresIn: '100000'})
            }
        });
  
    }catch(err){
        console.log('********', err);
        return res.json(500, {
         message: 'internal server error'
        });
    }
  }