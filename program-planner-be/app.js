import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import blocksRouter from './routes/api_v1/blocks.js';
import authRouter from './routes/api_v1/auth.js';

import session from 'express-session';
import connectPgSimple from "connect-pg-simple";
const PgSession = connectPgSimple(session);
import pool from './config/db.js';
import { config } from './config/config.js';
import dotenv from 'dotenv';
dotenv.config();


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

if (process.env.STATUS === 'production') {
    app.set('trust proxy', 1); // for render.com reverse proxy
}
app.use(
    session({
        store: new PgSession({ // store sessions in DB table      
            pool, 
            tableName: "session", 
            createTableIfMissing: true
        }),
        secret: process.env.SESSION_SECRET, // Used to sign session ID cookie. Constant in .env file or generated e.g., crypto.randomBytes(64).toString('hex')
        resave: false, // don’t save the session to DB if it hasn’t been modified
        saveUninitialized: false, // prevents creating empty sessions
        name: config.session.cookieName,
        cookie: {
            secure: process.env.STATUS === 'production', // true - sent cookie only via HTTPS
            httpOnly: true, // browser JavaScript cannot access the cookie via document.cookie - protects sessionId from being stolen by malicious JS
            sameSite: process.env.STATUS === 'production'?'none':'lax', // none: cookies are sent on all (even cross-site) requests, secure must be set to true
                                                                        // lax: same-site requests + top-level safe navigation (GET)
                                                                        // strict: same-site requests only                                                                         
            maxAge: 1000 * 60 * 60 * 24 }
             
    })    
);


app.use('/api/v1/blocks', blocksRouter);
app.use('/api/v1/auth', authRouter);


export default app;
