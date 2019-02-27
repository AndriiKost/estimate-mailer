"use strict"
const express = require('express')
const bodyParser = require('body-parser')
const router = require('./router/router')
// For aws
// const AWS = require('aws-sdk')
// AWS.config.loadFromPath('./aws.config.json')

const app = express()

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api', router)

module.exports = app