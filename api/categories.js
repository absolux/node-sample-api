
var router = require('express').Router()
var Category = require('../models/category')
var debug = require('debug')('api:categories')

router
  .route('/')
  .get(function(req, res, next) {
    
    debug("Get all categories")
    Category.all().then(function (collections) {
      res.json({ success: true, data: collections })
    }).catch(next)
    
  })
  .post(function (req, res, next) {
    
    debug("creating a category " + req.body.name)
    Category.create(req.body).then(function (categ) {
      debug("Category created: " + categ.get('name'))
      res.json({ success: true, data: categ })
    }).catch(next)
    
  })

router
  .route('/:id')
  .get(function (req, res, next) {
    
    debug("Get a category by id " + req.params.id)
    Category.find(req.params.id).then(function (categ) {
      debug("Retrieved category: " + categ.get('name'))
      res.json({ success: true, data: categ })
    }).catch(next)
    
  })
  .put(function (req, res, next) {
    
    debug("Update the category " + req.params.id)
    Category.find(req.params.id)
    .then(function (categ) {
      return categ.update(req.body)
    })
    .then(function (categ) {
      debug("Category updated: " + categ.get('name'))
      res.json({ success: true, data: categ })
    })
    .catch(next)
    
  })
  .delete(function (req, res, next) {
    
    debug("Delete a category with id " + req.params.id)
    Category.find(req.params.id).then(function (categ) {
      return categ.destroy()
    })
    .then(function (categ) {
      debug("Category deleted: " + categ.get('name'))
      res.json({ success: true, data: categ })
    })
    .catch(next)
    
  })

module.exports = router