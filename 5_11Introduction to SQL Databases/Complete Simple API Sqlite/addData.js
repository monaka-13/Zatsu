const Sequelize = require('sequelize');

// Initialise connection
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'quotes.sqlite',
    // code below line turns off warings
    operatorsAliases: false
});

// Define our Model
const Quote = sequelize.define('quotes', {
    quote: Sequelize.STRING,
    author: Sequelize.STRING
});

// Create the table (force drops any existing table)
(async () => {

    await Quote.sync( {force: true} );

    await Quote.bulkCreate([
        { quote: 'Life is good', author: 'John'},
        { quote: 'Life is amazing', author: 'Alice'},
    ]);

})();

