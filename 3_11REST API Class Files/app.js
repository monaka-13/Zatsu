const express = require('express');
const app = express();
const records = require('./records');
app.use(express.json());

// Send a GET request to /quotes to READ a list of quotes
app.get('/quotes', async (req, res) => {
  const quotes = await records.getQuotes();
  res.json(quotes);
});
// Send a GET request to /quotes/:id to READ(view) a quote
app.get('/quotes/:id', async (req, res) => {
  const quote = await records.getQuote(req.params.id);
  res.json(quote);
});

//Send a POST request to /quotes to  CREATE a new quote 
app.post('/quotes', async (req, res) => {
  const quote = await records.createQuote({
    quote: req.body.quote,
    author: req.body.author
  });
  res.json(quote);
});
// Send a PUT request to /quotes/:id to UPDATE (edit) a quote
app.put('/quotes/:id', async (req, res) => {
  const quote = await records.getQuote(req.params.id);
  quote.quote = req.body.quote;
  quote.author = req.body.author;

  await records.updateQuote(quote);
  res.json({ message: "Quote successfully updated." });
  res.status(204).end();
});

// Send a DELETE request to /quotes/:id DELETE a quote 
app.delete("/quotes/:id", async (req, res, next) => {
  const quote = await records.getQuote(req.params.id);
  await records.deleteQuote(quote);
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

// you can run
// http://127.0.0.1:8080/quotes
// curl -Method PUT -Uri http://127.0.0.1:3000/quotes/1 -Body '{"quote":"Updated","author":"Me"}' -ContentType "application/json"