
var router = require('express').Router()

/* GET */
router.use('/categories', require('./api/categories'))
router.use('/tags', require('./api/tags'))

module.exports = router