'use strict';
const R = require('ramda');
const fs = require('fs');
const DataContacts = fs
.readFileSync(process.cwd() + '/data/import_new.json', 'UTF-8');
const contacts = JSON.parse(DataContacts);
const groups = contacts.map(contact => contact.groupName);

const prepared = R.compose(
  R.uniq
)(groups);

const indexed = prepared.map((name, idx) => ({name, _id: idx}));
indexed.shift();

function findContactGroup(name) {
  const res = R.find(R.propEq('name', name), indexed);
  if (res) return res._id;
}

module.exports = {
  findContactGroup,
  contactGroups: indexed,
};
