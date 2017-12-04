'use strict';
const colors = require('colors');
const path = require('path');
const models = require(process.cwd() + '/server/model-config.json');

const app = require(process.cwd() + '/server/server');
const datasources = require(process.cwd() + process.env === 'production' ? '/server/datasources.json' : '/server/datasources.production.json');

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

autoUpdateAll();
