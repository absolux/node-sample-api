
exports.up = function(knex, Promise) {
 
 return knex.schema.createTable('posts', function (table) {
    table.increments('id')
    table.integer('category_id')
    table.string('title').notNullable()
    table.string('slug').notNullable().index()
    table.text('content').nullable()
    table.timestamps()
  })
  
}

exports.down = function(knex, Promise) {
  
  return knex.schema.dropTable('posts')
  
}
