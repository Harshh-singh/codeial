const fs = require('fs');
const path = require('path');
const rfs = require('rotating-file-stream');

const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path : logDirectory
});


const development = {
    name: 'development',
    asset_path: './assets',
    session_cookie_key: 'something',
    db: 'codeial_development',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth:{
            user: 'h10317981@gmail.com',
            pass: 'ghfj uvyh ftxr opjq'
        }
    },
        google_client_id: "197817596332-tiikmdher2vvspqmbjlrhjo8cfdgk7k1.apps.googleusercontent.com",
        google_client_secret: "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",
        google_callback_url: "http://localhost:8000/users/auth/google/callback",
        jwt_secret: 'codeial',
        morgan: {
            mode: 'dev',
            options: {stream:accessLogStream}
        }
}

const production = {
    name : 'production',
    asset_path: process.env.asset_path,
    session_cookie_key: process.env.session_cookie_key,
    db: process.env.db,
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth:{
            user: process.env.Gmail_username,
            pass: process.env.Gmail_password
        }
    },
        google_client_id: process.env.google_client_id,
        google_client_secret: process.env.google_client_secret,
        google_callback_url: process.env.google_callback_url,
        jwt_secret: process.env.jwt_secret,
        morgan: {
            mode: 'combined',
            options: {stream:accessLogStream}
        }
}

// module.exports = eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);
module.exports = production;