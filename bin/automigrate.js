'use strict';
const colors = require('colors');
const seed = require('../fixtures/seed');

module.exports = async (app) => {
  var path = require('path');
  var models = require(path.resolve(__dirname, '../model-config.json'));
  var datasources = require(path.resolve(__dirname, '../datasources.json'));

  function autoUpdateAll() {
    Object.keys(models).forEach(async function(key) {
      if (typeof models[key].dataSource != 'undefined') {
        if (typeof datasources[models[key].dataSource] != 'undefined') {
          await app
          .dataSources[models[key].dataSource]
          .autoupdate(key, function(err) {
            if (err) throw err;
            console.log('Model ' + key + ' updated');
          });
        }
      }
    });
  }

  async function autoMigrateAll() {
    const promises = Object.keys(models).map(function(key) {
      if (typeof models[key].dataSource != 'undefined') {
        if (typeof datasources[models[key].dataSource] != 'undefined') {
          return app
          .dataSources[models[key].dataSource]
          .automigrate(key)
          .then(res => res)
        }
      }
    });
    return await Promise.all(promises)
  }
  // TODO: change to autoUpdateAll when ready for CI deployment to production
  // await autoMigrateAll();
  // console.log('All Tables Created'.cyan);
  // await seed();
  // autoUpdateAll();

};
