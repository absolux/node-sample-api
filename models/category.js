
var Category = module.exports = require('vitamin').extend({
  
  $table: 'categories',
  
  $fillable: [ 'name' ],
  
  posts: function () {
    return this.hasMany(require('./post'), 'category_id')
  }
  
})

// update the slug on saving
Category.on('saving', function (tag) {
  var name = this.get('name', "")
  
  this.set('slug', name.replace(' ', '-').toLowerCase())
})