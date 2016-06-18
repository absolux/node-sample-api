
var router = require('express').Router()

/* GET */
router.use('/categories', require('./api/categories'))

module.exports = router