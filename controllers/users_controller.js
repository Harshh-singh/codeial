module.exports.profile = function(req , res){
    return res.render('user_profile' , {
        title: 'user profile',
        // body: 'This is user profile'
    })
}