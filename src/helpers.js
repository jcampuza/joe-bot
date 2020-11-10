const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'store', 'db.json');

const readFile = (path) => {
  try {
    return JSON.parse(fs.readFileSync(path, 'utf-8'));
  } catch {
    console.log('Error reading file', path);

    return {};
  }
};

const writeDb = (db) => {
  const formatted = JSON.stringify(db, '', '\t');

  fs.writeFileSync(dbPath, formatted);
};

const fetchDb = () => {
  const db = readFile(dbPath);

  return db;
};

module.exports = {
  writeDb,
  fetchDb,
};
