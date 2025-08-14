
const Sequelize = require('sequelize');

// Initialise connection
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'quotes.sqlite',
    operatorsAliases: false,
    logging: false
});

// Define our Model
const Quote = sequelize.define('quotes', {
    quote: Sequelize.STRING,
    author: Sequelize.STRING
});

// Get some data
(async () => {
    const rows = await Quote.findAll();
    rows.map((row) => {
        console.log(`quote: ${row.quote}, author: ${row.author}`);
    });
})();


