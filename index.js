const express = require('express');
const port = 8000;
const app = express();

//use express router
app.use('/' , require('./routes/index'));

//setting up our view engine
app.set('view engine' , 'ejs');
app.set('views' , './views');

app.listen(port , function(err){
    if(err){
        console.log(`Error in starting the server: ${err}`);
    }
    console.log(`server is running on port: ${port}`);
});
