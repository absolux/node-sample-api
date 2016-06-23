
var router = require('express').Router()

/* GET */
router.use('/categories', require('./controllers/categories'))
router.use('/posts', require('./controllers/posts'))
router.use('/tags', require('./controllers/tags'))

module.exports = router