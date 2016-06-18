
var Sluggable = require('../plugins/sluggable')
var Timestamps = require('../plugins/timestamps')

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

// use the timestamps plugin
Post.use(new Timestamps())