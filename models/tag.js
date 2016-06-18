
var Sluggable = require('../plugins/sluggable')

var Tag = module.exports = require('vitamin').extend({
  
  $table: 'tags',
  
  $fillable: [ 'name' ],
  
  posts: function () {
    return this.belongsToMany(require('./post'), 'post_tags', 'post_id', 'tag_id')
  }
  
})

// use the sluggable plugin
Tag.use(new Sluggable(), 'name', 'slug')

// detach all posts when deleting a tag
Tag.on('deleted', function (model) {
  return model.posts().detach()
})