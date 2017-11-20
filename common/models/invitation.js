'use strict';

module.exports = function(Invitation) {
  Invitation.confirm = async (inviteId, status, next) => {
    try {
      const result = await Invitation.findById(inviteId);
      result.updateAttribute('status', status)
      return 'your status is set to ' + status
    } catch(e) {
      const error = new Error('Invitation not found, or expired.');
      return next(error)
    }
  };

  Invitation.validatesInclusionOf('status', {
    in: ['unconfirmed', 'attending', 'not-attending'],
  });
};
