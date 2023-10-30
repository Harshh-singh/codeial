const express = require('express');
const dotenv = require('dotenv').config();
const env = require('./config/environment');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const port = 8000;
const app = express();
require('./config/view-helpers')(app);
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');

const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customeMware = require('./config/middleware');

const chatServer = require('http').Server(app);
const chatSocket = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is running on port 5000');
const path = require('path');


if(env.name == "development"){
app.use(sassMiddleware({
    src: path.join(__dirname, env.asset_path, 'scss'),
    dest: path.join(__dirname, env.asset_path, 'css'),
    debug:true,
    outputStyle:'extended',
    prefix:'/css'
}))
}

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static(env.asset_path));

//make the uploads path available to the browser
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(logger(env.morgan.mode, env.morgan.options));

app.use(expressLayouts);

//extract style and scripts from sub pages into the layout
app.set('layout extractStyles' , true);
app.set('layout extractScripts' , true);


app.set('view engine' , 'ejs');
app.set('views' , './views');

//mongo store is used to store the session cookie in the db
app.use(session({
    name: 'codeial',
    //Todo change the secret before deployment in production mode
    secret: env.session_cookie_key,
    saveUninitialized:false,
    resave:false,
    cookie: {
        maxAge:(1000*60*100)
    },
    store: MongoStore.create(
        {
        mongoUrl: 'mongodb://127.0.0.1/codeial_development',
        autoRemove: 'disabled'
    }, 

    
    function(err){
        console.log(err || 'connect-mongodb setup ok');
    }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customeMware.setflash);

app.use('/' , require('./routes'));

app.listen(port , function(err){
    if(err){
        console.log(`Error in starting the server: ${err}`);
    }
    console.log(`server is running on port: ${port}`);
});
