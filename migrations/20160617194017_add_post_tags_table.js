
exports.up = function(knex, Promise) {
 
 return knex.schema.createTable('post_tags', function (table) {
    table.increments('id')
    table.integer('post_id').index()
    table.integer('tag_id').index()
  })
  
}

exports.down = function(knex, Promise) {
  
  return knex.schema.dropTable('post_tags')
  
}
