
var Tag     = require('../models/tag')
var router  = require('express').Router()
var debug   = require('debug')('api:tags')

router
  .route('/')
  .get(function(req, res, next) {
    
    debug("Get all tags")
    Tag.all().then(function (collections) {
      res.json({ success: true, data: collections })
    }).catch(next)
    
  })
  .post(function (req, res, next) {
    
    debug("creating a tag " + req.body.name)
    Tag.create(req.body).then(function (tag) {
      debug("Tag created: " + tag.get('name'))
      res.json({ success: true, data: tag })
    }).catch(next)
    
  })

router
  .route('/:id')
  .get(function (req, res, next) {
    
    debug("Get a tag by id " + req.params.id)
    Tag.find(req.params.id).then(function (tag) {
      debug("Retrieved tag: " + tag.get('name'))
      res.json({ success: true, data: tag })
    }).catch(next)
    
  })
  .put(function (req, res, next) {
    
    debug("Update the tag " + req.params.id)
    Tag.find(req.params.id)
    .then(function (tag) {
      return tag.update(req.body)
    })
    .then(function (tag) {
      debug("Tag updated: " + tag.get('name'))
      res.json({ success: true, data: tag })
    })
    .catch(next)
    
  })
  .delete(function (req, res, next) {
    
    debug("Delete a tag with id " + req.params.id)
    Tag.find(req.params.id).then(function (tag) {
      return tag.destroy()
    })
    .then(function (tag) {
      debug("Tag deleted: " + tag.get('name'))
      res.json({ success: true, data: tag })
    })
    .catch(next)
    
  })

module.exports = router