'use strict';

module.exports = {
  'db': {
    'host': 'ec2-107-20-214-99.compute-1.amazonaws.com',
    'port': '5432',
    url: process.env.DATABASE_URL,
    'connector': 'postgresql',
    'debug': true,
  },
  'email': {
    'name': 'email',
    'connector': 'mail',
    'senderName': 'Harriet Carpaldi',
    'senderEmail': 'harriet.capaldi@tgf.org.uk',
    'hostName': 'http://eventmanagementapp.herokuapp.com',
    'transports': [
      {
        'type': 'smtp',
        'host': 'in-v3.mailjet.com',
        'secure': true,
        'port': 465,
        'auth': {
          'user': '22d2a3a58b2f51e1a76c6856da7c0ce5',
          'pass': '6ae7bc8d15e9501dc00ed82c20d1ddd2',
        },
      },
    ],
  },
};
