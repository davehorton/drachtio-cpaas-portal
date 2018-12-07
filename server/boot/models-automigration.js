const async = require('async');
module.exports = function (app) {
  var mysql = app.dataSources.db;

  app.dataSources.db.automigrate();
   console.log("Performed automigration.");
};
