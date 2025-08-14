const express = require('express');
const app = express();
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

// Sync and initialize the database
app.use(express.json());

// Send a GET request to /quotes to READ a list of quotes
app.get('/quotes', async (req, res) => {
    const quotes = await Quote.findAll();
    res.json(quotes);
});

// Send a GET request to /quotes/:id to READ(view) a quote
app.get('/quotes/:id', async (req, res) => {
    const quote = await Quote.findAll({
        where: {
            id: req.params.id
        }
    });
    res.json(quote);
});

//Send a POST request to /quotes to  CREATE a new quote 
app.post('/quotes', async (req, res) => {
    const quote = await Quote.create({
        quote: req.body.quote,
        author: req.body.author
    });
    res.json(quote);
});
// Send a PUT request to /quotes/:id to UPDATE (edit) a quote
app.put('/quotes/:id', async (req, res) => {
    const quote = await Quote.findOne({
        where: {
            id: req.params.id
        }
    });

    quote.quote = req.body.quote;
    quote.author = req.body.author;

    await quote.save();
    res.json({ message: "Quote successfully updated." });
});

// Send a DELETE request to /quotes/:id DELETE a quote 
app.delete("/quotes/:id", async (req, res, next) => {
    const quote = await Quote.destroy({
        where: {
            id: req.params.id
        }
    });
    res.json({ message: "Quote successfully deleted." });
});

// Send a GET request to /quotes/quote/random to READ (view) a random quote

app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    })
});

app.listen(3000, () => console.log('Quote API listening on port 3000!'));

