import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import blocksRouter from './routes/api_v1/blocks.js';

/*var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');*/

import cors from 'cors';
// ...


var app = express();

app.use(cors({
  origin: ["http://localhost:5173"], // pridaj všetky dev/prod originy
  methods: ["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
  credentials: true,
  //allowedHeaders: ["Content-Type","Authorization"]
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(import.meta.url, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/api/v1/blocks', blocksRouter);


export default app;

//module.exports = app;
