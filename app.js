/* global __dirname */

var bodyParser = require('body-parser')
var app = module.exports = require('express')()

// configuration
require('dotenv').load()
require('./config/database')

// middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// routes
app.use('/api', require('./routes'))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500)
  res.json({
    success: false,
    data: {
      code: err.status,
      message: err.message
    }
  })
})
