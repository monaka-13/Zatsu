const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('example.sqlite3');

db.each('SELECT rowid AS id, name FROM authors', (err, row) => {
    console.log(`${row.id}: ${row.name}`);
});