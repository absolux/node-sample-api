
var Category = module.exports = require('vitamin').extend({
  
  $table: 'categories',
  
  $fillable: [ 'name' ],
  
  posts: function () {
    return this.hasMany(require('./post'), 'category_id')
  }
  
})

// update the slug on saving
Category.on('saving', function (categ) {
  var name = categ.get('name')
  
  if (! name ) throw new Error("Category name is required")
  
  categ.set('slug', name.trim().replace(/\s/g, '-').toLowerCase())
})