const express = require('express');
const port = 8000;
const app = express();
const expressLayouts = require('express-ejs-layouts');

app.use(express.static('./assets'));

app.use(expressLayouts);

//extract style and scripts from sub pages into the layout
app.set('layout extractStyles' , true);
app.set('layout extractScripts' , true);

app.use('/' , require('./routes'));

app.set('view engine' , 'ejs');
app.set('views' , './views');

app.listen(port , function(err){
    if(err){
        console.log(`Error in starting the server: ${err}`);
    }
    console.log(`server is running on port: ${port}`);
});