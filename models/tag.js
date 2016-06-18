
var Tag = module.exports = require('vitamin').extend({
  
  $table: 'tags',
  
  $fillable: [ 'name' ],
  
  posts: function () {
    return this.belongsToMany(require('./post'), 'post_tags', 'post_id', 'tag_id')
  }
  
})

// update the slug on saving
Tag.on('saving', function (tag) {
  var name = tag.get('name')
  
  if (! name ) throw new Error("Tag name is required")
  
  tag.set('slug', name.trim().replace(/\s/g, '-').toLowerCase())
})