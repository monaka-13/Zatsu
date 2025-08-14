const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('example.sqlite3');

db.serialize(() => {
    db.run('DROP TABLE IF EXISTS authors');
    db.run("CREATE TABLE authors (name TEXT)");

    db.run("INSERT INTO authors VALUES ('Mark Twain')");
    db.run("INSERT INTO authors VALUES ('William Shakespeare')");
    db.run("INSERT INTO authors VALUES ('Agatha Christie')");
    db.run("INSERT INTO authors VALUES ('Barbara Cartland')");

    // You can also use prepared statements, which are more efficient
    // const stmt = db.prepare("INSERT INTO Cheeses VALUES (?)");    
    // stmt.run("Mark Twain");
    // stmt.run("William Shakespeare");
    // stmt.run("Agatha Christie");
    // stmt.run("Barbara Cartland");

    // stmt.finalize();

    db.each('SELECT rowid AS id, name FROM authors', (err, row) => {
        console.log(`${row.id}: ${row.name}`);
    });

});

db.close;