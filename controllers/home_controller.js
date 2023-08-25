const { response } = require("express")

module.exports.home = function(req,res){
    return res.end('<h1>Express is up for codeial!');
}

//module.exports.actionname = function(req,res){}