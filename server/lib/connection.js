const MySQL = require("mysql");

let dbOptions = '';
const { env, dbName } = require("./databaseMySQL.js");

if(env === 'prod'){
   dbOptions = {
      host: 'localhost',
      user: 'root',
      port: 3306,
      password: '',
      database: dbName,
   };
}else{
   dbOptions = {
      host: 'localhost',
      user: 'root',
      port: 3306,
      password: '',
      database: dbName,
   };
}


let connectionPool = MySQL.createPool({ host: dbOptions.host, user: dbOptions.user, password: dbOptions.password, port: dbOptions.port, database: dbName });

const getConnection = async function (done) {
   try {
      connectionPool.getConnection(done);
   } catch (ex) {
      console.log("ex........", ex);
      throw ex;
   }
};

module.exports = { getConnection: getConnection, dbName: dbName };