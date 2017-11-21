const fs = require('fs');
const parse = require('csv-parse');

const data = fs.readFileSync('bin/core_list.csv', 'UTF-8');
const result = parse(data, {delimiter: '|', columns: true}, (err, data) => {
  const sanitized = data.map(contact => {
    if (contact.email === 'Unknown') contact.email = null;
    return contact;
  });
  fs.writeFileSync('data/import.json', JSON.stringify(sanitized));
});
