/* global process */

// see http://www.dancorman.com/knex-your-sql-best-friend/

var env = process.env.NODE_ENV || 'development'
var config = require('../knexfile')
var Vitamin = require('vitamin')

Vitamin.connection(config[env])

// knex instance
var db = Vitamin.prototype.$connection

// launch the latest migrations
db.migrate.latest([config])
