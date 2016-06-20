
var Sluggable = require('../plugins/sluggable')
var Promise = require('bluebird')

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

/**
 * Load an existing tag or create a new one
 * 
 * @param {Object} attrs
 * @return Promise 
 */
// Tag.firstOrCreate = function (attrs) {
//   return new Promise(function (resolve, reject) {
//     Tag.where(attrs).fetch(function (err, res) {
//       if (! err ) return resolve(res)
      
//       Tag.create(attrs).then(resolve).catch(reject)
//     })
//   })
// }