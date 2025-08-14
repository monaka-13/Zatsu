// **** THis is a simple Express.js server that connects to a MongoDB database and provides RESTful API endpoints for managing books. ****
// It allows you to create, read, update, and delete book records in the database.
// The server uses Mongoose for MongoDB object modeling and Express for handling HTTP requests.
// The server listens on a specified port and uses CORS to allow cross-origin requests.
// The MongoDB connection string is hardcoded for demonstration purposes, but it can be replaced with
// an environment variable for better security in a production environment.
'use strict';

// ############################################# //
// ##### this part is for the server setup #####
// Server Setup for Book Management API 
// importing packages
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// require('dotenv').config();

// setups
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://tempuser:123@cluster0.f9d6o.gcp.mongodb.net/books', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        // Start your Express server once connected to MongoDB
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

// ##### this part was for the server setup #####
// ############################################# //


// ############################################# //
// ##### this part is for setting up a model #####

// define Schema Class
const Schema = mongoose.Schema;

// Create a Schema object
// This schema defines the structure of the book documents in the MongoDB collection
// Each book will have a title, author, pages, and fiction status
// The 'required' field ensures that these fields must be provided when creating a new book document
// The 'title' and 'author' fields are strings, 'pages' is a number, and 'fiction' is a boolean
// This schema will be used to create a Mongoose model, which provides an interface to interact with the MongoDB collection
// The model will allow us to perform CRUD operations (Create, Read, Update, Delete) on the book documents in the collection

// you must modify the schema, for your own needs
// For example, you can add more fields like 'publishedDate', 'genre', etc.
// or you can change the data types of the fields

const mongoose = require('mongoose');
const bookSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    pages: { type: Number, required: true },
    fiction: { type: Boolean, required: true },
});

const Book = mongoose.model("Book", bookSchema);

// ##### this part was for setting up a model ##### //
// ############################################### //


// ############################################# //
// ##### this part is for setting up each route ##### //

const router = express.Router();

// Mount the router middleware at a specific path
app.use('/api', router);

// similar to app.get('/', (req, res) => { ... })
// This sets up the base route for the API, allowing you to access the book management endpoints
// The '/api' prefix is used to group all book-related routes under this path
router.route("/")
    .get((req, res) => {
        Book.find()
            .then((books) => res.json(books))
            .catch((err) => res.status(400).json("Error: " + err));
    });

// similar to app.get('/:id', (req, res) => { ... })
// This sets up a route to get a specific book by its ID
// The ':id' part of the route is a route parameter that will match any book ID
// When a GET request is made to '/api/:id', the server will look for a book with that ID in the database
// If found, it will return the book details as a JSON response
// If not found, it will return a 400 status with an error message
// This allows clients to retrieve individual book records by their unique identifier
// The 'req.params.id' is used to access the ID from the request URL
// This is useful for operations like viewing, updating, or deleting a specific book
// The 'Book.findById' method is used to search for a book by its ID
// If the book is found, it is returned as a JSON response
// If an error occurs during the database operation, a 400 status code is returned with the

router.route("/:id")
    .get((req, res) => {
        Book.findById(req.params.id)
            .then((book) => res.json(book))
            .catch((err) => res.status(400).json("Error: " + err));
    });

// This sets up a route to add a new book to the database
// When a POST request is made to '/api/add', the server will create a new book
// The request body should contain the book details (title, author, pages, fiction)
// The server will create a new Book object using the provided details
// It will then save this new book to the MongoDB database
// If the book is successfully added, it will return a success message as a JSON response
// If there is an error during the save operation, it will return a 400 status with an error message
// This allows clients to create new book records in the database
router.route("/add")
    .post((req, res) => {
        const title = req.body.title;
        const author = req.body.author;
        const pages = req.body.pages;
        const fiction = req.body.fiction;
        // create a new Book object 
        const newBook = new Book({
            title,
            author,
            pages,
            fiction
        });

        // console.log("checkpoint");

        // save the new object (newBook)
        newBook
            .save()
            .then(() => res.json("Book added!"))
            .catch((err) => res.status(400).json("Error: " + err));
    });

// This sets up a route to update an existing book by its ID
// When a PUT request is made to '/api/update/:id', the server will look for a book with the specified ID
// The ':id' part of the route is a route parameter that will match any book ID
// The request body should contain the updated book details (title, author)
// The server will find the book by its ID using 'Book.findById(req.params.id)'
// If the book is found, it will update its title and author with the new values from the request body
// After updating the book, it will save the changes to the database
// If the book is successfully updated, it will return a success message as a JSON response
// If the book is not found or there is an error during the update operation, it will
// return a 400 status with an error message
// This allows clients to modify existing book records in the database
// The 'req.params.id' is used to access the ID from the request URL
// The 'req.body' is used to access the updated book details from the request body
// The 'book.save()' method is used to save the updated book back to the database
// If the book is not found, it will return a 400 status with an error message
// If there is an error during the save operation, it will return a 400 status with
// an error message
// This is useful for operations like editing book details
router.route("/update/:id")
    .put((req, res) => {
        Book.findById(req.params.id)
            .then((book) => {
                book.title = req.body.title;
                book.author = req.body.author;

                book
                    .save()
                    .then(() => res.json("Book updated!"))
                    .catch((err) => res.status(400).json("Error: " + err));
            })
            .catch((err) => res.status(400).json("Error: " + err));
    });

router.route("/delete/:id")
    .delete((req, res) => {
        Book.findByIdAndDelete(req.params.id)
            .then(() => res.json("Book deleted."))
            .catch((err) => res.status(400).json("Error: " + err));
    });
