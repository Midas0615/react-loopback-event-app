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
