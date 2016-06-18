
var router = require('express').Router()

/* GET */
router.use('/categories', require('./api/categories'))
router.use('/posts', require('./api/posts'))
router.use('/tags', require('./api/tags'))

module.exports = router