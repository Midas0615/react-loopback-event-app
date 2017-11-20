'use strict';

module.exports = function(Emailtemplate) {
  Emailtemplate.validatesInclusionOf('type', {
    in: ['system', 'event', 'common'],
  });
};
