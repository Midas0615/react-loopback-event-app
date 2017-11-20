'use strict';
const R = require('ramda');

module.exports = function(BaseModel) {
  BaseModel.observe('before save', function updateTimestamp(ctx, next) {
    const accountId = R.path(['options', 'accessToken', 'userId'], ctx);
    // Created and Updated At
    if (ctx.isNewInstance) {
      ctx.instance.createdAt = new Date();
      ctx.instance.updatedAt = new Date();
      ctx.instance.accountId = accountId || 1;
    } else {
      ctx.data.updatedAt = new Date();
      delete ctx.data.accountId;
    }
    next();
  });
};
