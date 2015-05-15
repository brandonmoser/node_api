var mongoose = require('mongoose');
var config = require('../config/db');

var DB_HOST = process.env.DB_HOST || config.DB_HOST;
var DB_PORT = process.env.DB_PORT || config.DB_PORT;
var DATABASE = process.env.DATABASE || config.DATABASE;

var connection_str = 'mongodb://'+DB_HOST+':'+DB_PORT+'/'+DATABASE;
if (process.env.DB_DEBUG) console.log('Connecting to MongoDB', connection_str);
mongoose.connect(connection_str);

if (process.env.DB_DEBUG) mongoose.set('debug', true);
