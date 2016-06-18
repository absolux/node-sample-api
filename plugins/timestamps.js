
module.exports = Timestamps

const CREATED_AT = 'created_at'
const UPDATED_AT = 'updated_at'

/**
 * Timestamps plugin constructor
 * 
 * @constructor
 */
function Timestamps() {}

/**
 * Plugin installer
 * 
 * @param {Model} model
 */
Timestamps.prototype.install = function install(model) {
  model.on('creating', updateTimestamps)
  model.on('updating', updateTimestamps)
}

/**
 * Update the creation and update timestamps
 * 
 * @param {Model} model
 */
function updateTimestamps(model) {
  var time = new Date()
  
  if (! model.isDirty(UPDATED_AT) ) {
    model.set(UPDATED_AT, time)
  }
  
  if ( model.isNew() && !model.isDirty(CREATED_AT) ) {
    model.set(CREATED_AT, time)
  }
}