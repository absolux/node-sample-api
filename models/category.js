
var Sluggable = require('../plugins/sluggable')

var Category = module.exports = require('vitamin').extend({
  
  $table: 'categories',
  
  $fillable: [ 'name' ],
  
  posts: function () {
    return this.hasMany(require('./post'), 'category_id')
  }
  
})

// use the sluggable plugin
Category.use(new Sluggable(), 'name', 'slug')