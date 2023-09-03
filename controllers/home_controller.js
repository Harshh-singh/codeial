const { response } = require("express")

module.exports.home = function(req,res){
    return res.render('home' , {
        title : 'Home',
        // body : 'This is the home file'
    });
}

//module.exports.actionname = function(req,res){}