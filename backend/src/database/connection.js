const knex = require('knex');
const configutarion =  require('../../knexfile');

const connection =  knex(configutarion.development);

module.exports = connection;