
var Sluggable = require('../plugins/sluggable')

var Post = module.exports = require('vitamin').extend({
  
  $table: 'posts',
  
  $fillable: [ 'title', 'content' ],
  
  category: function () {
    return this.belongsTo(require('./category', 'category_id'))
  },
  
  tags: function () {
    return this.belongsToMany(require('./tag'), 'post_tags', 'tag_id', 'post_id')
  }
  
})

// use the sluggable plugin
Post.use(new Sluggable(), 'title', 'slug')

// update timestamp on creation
Post.on('creating', function (post) {
  post.set('created_at', new Date)
  post.set('updated_at', new Date)
})

// update timestamp on update
Post.on('updating', function (post) {
  post.set('updated_at', new Date)
})