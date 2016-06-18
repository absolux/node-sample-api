
module.exports = Sluggable

/**
 * Sluggable plugin constructor
 * 
 * @constructor
 */
function Sluggable() {}

/**
 * Plugin installer
 * 
 * @param {Model} model
 * @param {String} attr
 * @param {String} slug
 */
Sluggable.prototype.install = function install(model, attr, slug) {
  model.on('saving', function (instance) {
    var value = instance.get(attr)
    
    if (! value ) throw new Error("The '" + attr + "' field is required")
    
    instance.set(slug, transform(value))
  })
}

/**
 * Get a slug string of the given value
 * 
 * @param {String} input
 * @return string
 */
function transform(input) {
  return String(input).trim().replace(/\s/g, '-').toLowerCase()
}