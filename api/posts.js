
var Promise = require('bluebird')
var _       = require('underscore')
var Tag     = require('../models/tag')
var Post    = require('../models/post')
var router  = require('express').Router()
var debug   = require('debug')('api:posts')

router
  .route('/')
  .get(function(req, res, next) {
    
    debug("Get all posts")
    Post
      .populate('category', 'tags')
      .fetchAll(function (error, collection) {
        if ( error ) next(error)
        
        res.json({ success: true, data: collection })
      })
    
  })
  .post(function (req, res, next) {
    
    debug("creating a post " + req.body.title)
    Post
      .create(req.body)
      .tap(function attachTags(post) {
        var tags = String(req.body.tags).split(',')
        
        return Promise
          .map(tags, function (value) {
            return Tag.firstOrCreate({ 'name': value.trim() })
          })
          .then(function (tags) {
            // get tag ids 
            var ids = _.map(tags, function (t) {
              return t.getId()
            })
            
            return post.tags().attach(ids)
          })
      })
      .catch(next)
      .then(function (post) {
        debug("Post created: " + post.get('title'))
        res.json({ success: true, data: post })
      })
    
  })

router
  .route('/:id')
  .get(function (req, res, next) {
    
    debug("Get a post by id " + req.params.id)
    Post
      .where('id', req.params.id)
      .populate('tags', 'category')
      .fetch(function (error, post) {
        if ( error ) next(error)
        
        debug("Retrieved post: " + post.get('title'))
        res.json({ success: true, data: post })
      })
    
  })
  .put(function (req, res, next) {
    
    debug("Update the post " + req.params.id)
    Post.find(req.params.id)
      .then(function (post) {
        return post.update(req.body)
      })
      // TODO sync tags
      .catch(next)
      .then(function (post) {
        debug("Post updated: " + post.get('title'))
        res.json({ success: true, data: post })
      })
    
  })
  .delete(function (req, res, next) {
    
    debug("Delete a post with id " + req.params.id)
    Post.find(req.params.id)
    .then(function (post) {
      return post.destroy()
    })
    .catch(next)
    .then(function (post) {
      debug("Post deleted: " + post.get('title'))
      res.json({ success: true, data: post })
    })
    
  })

module.exports = router