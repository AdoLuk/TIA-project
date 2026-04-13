import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import blocksRouter from './routes/api_v1/blocks.js';
import authRouter from './routes/api_v1/auth.js';


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(import.meta.url, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/api/v1/blocks', blocksRouter);
app.use('/api/v1/auth', authRouter);


export default app;

//module.exports = app;
