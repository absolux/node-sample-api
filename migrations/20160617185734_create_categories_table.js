
exports.up = function(knex, Promise) {
  
  return knex.schema.createTable('categories', function (table) {
    table.increments('id')
    table.string('name').notNullable()
    table.string('slug').notNullable().index()
  })
  
}

exports.down = function(knex, Promise) {
  
  return knex.schema.dropTable('categories')
  
}
