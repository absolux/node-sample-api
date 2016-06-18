/* global process */

module.exports = {

  development: {
    client: 'mysql',
    debug: false,
    connection: process.env.DATABASE_URL || {
      host     : process.env.DB_HOST,
      database : process.env.DB_DATABASE,
      user     : process.env.DB_USER,
      password : process.env.DB_PASSWORD,
      charset  : 'utf8'
    }
  }

}
