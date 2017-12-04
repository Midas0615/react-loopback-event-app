'use strict';
const colors = require('colors');
const path = require('path');
const models = require(process.cwd() + '/server/model-config.json');

const app = require(process.cwd() + '/server/server');

let datasources;
if (process.env.NODE_ENV === 'production') {
  datasources = require(process.cwd() + '/server/datasources.production.json' );
} else {
  datasources = require(process.cwd() + '/server/datasources.json');
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
// autoUpdateAll();


autoMigrateAll();
