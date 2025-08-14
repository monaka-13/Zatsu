'use strict';

// ############################################# //
// ##### Server Setup for Task Management API #####
// ############################################# //

// Importing packages
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Initialize Express app
const app = express();
// Define the port for the server to listen on
const port = process.env.PORT || 3000; // Default port set to 3000

// Middleware setup
// Enable CORS (Cross-Origin Resource Sharing) for all routes
app.use(cors());
// Enable Express to parse JSON formatted request bodies
app.use(express.json());

// MongoDB connection string.
// This string is generated from the inputs provided in the UI.
mongoose.connect('mongodb+srv://user1:1234@cluster0.f9d6o.gcp.mongodb.net/Activitiy', {
    useNewUrlParser: true, // Use the new URL parser instead of the deprecated one
    useUnifiedTopology: true // Use the new server discovery and monitoring engine
})
.then(() => {
    console.log('Connected to MongoDB');
    // Start the Express server only after successfully connecting to MongoDB
    app.listen(port, () => {
        console.log('Task API Server is running on port ' + port);
    });
})
.catch((error) => {
    // Log any errors that occur during the MongoDB connection
    console.error('Error connecting to MongoDB:', error);
});


// ############################################# //
// ##### Task Model Setup #####
// ############################################# //

// Define Mongoose Schema Class
const Schema = mongoose.Schema;

// Create a Schema object for the Task model
// This schema defines the structure of task documents in the MongoDB collection.
const taskSchema = new Schema({
    activity: { type: String, required: true  }
});

// Create a Mongoose model from the taskSchema.
// This model provides an interface to interact with the 'tasks' collection in MongoDB.
// Mongoose automatically pluralizes "Task" to "tasks" for the collection name.
const Task = mongoose.model("Task", taskSchema);


// ############################################# //
// ##### Task API Routes Setup #####
// ############################################# //

// Create an Express Router instance to handle task-related routes.
const router = express.Router();

// Mount the router middleware at the '/api/tasks' path.
// All routes defined on this router will be prefixed with '/api/tasks'.
app.use('/api/tasks', router);

// Route to get all tasks from the database.
// Handles GET requests to '/api/tasks/'.
router.route("/")
    .get(async (req, res) => { // Added async
        try {
            const tasks = await Task.find(); // Added await
            res.json(tasks);
        } catch (err) {
            res.status(400).json("Error: " + err);
        }
    });

// Route to get a specific task by its ID.
// Handles GET requests to '/api/tasks/:id'.
router.route("/:id")
    .get(async (req, res) => { // Added async
        try {
            const task = await Task.findById(req.params.id); // Added await
            res.json(task);
        } catch (err) {
            res.status(400).json("Error: " + err);
        }
    });

// Route to add a new task to the database.
// Handles POST requests to '/api/tasks/add'.
router.route("/add")
    .post(async (req, res) => { // Added async
        // Extract attributes from the request body.
        const activity = req.body.activity;

        // Create a new Task object using the extracted data.
        const newTask = new Task({
            activity
        });

        try {
            await newTask.save(); // Added await
            res.json("Task added!");
        } catch (err) {
            res.status(400).json("Error: " + err);
        }
    });

// Route to update an existing task by its ID.
// Handles PUT requests to '/api/tasks/update/:id'.
router.route("/update/:id")
    .put(async (req, res) => { // Added async
        try {
            const task = await Task.findById(req.params.id); // Added await
            if (!task) {
                return res.status(404).json("Error: Task not found");
            }

            // Update the task's attributes with data from the request body.
            task.activity = req.body.activity;

            await task.save(); // Added await
            res.json("Task updated!");
        } catch (err) {
            res.status(400).json("Error: " + err);
        }
    });

// Route to delete a task by its ID.
// Handles DELETE requests to '/api/tasks/delete/:id'.
router.route("/delete/:id")
    .delete(async (req, res) => { // Added async
        try {
            const deletedTask = await Task.findByIdAndDelete(req.params.id); // Added await
            if (!deletedTask) {
                return res.status(404).json("Error: Task not found");
            }
            res.json("Task deleted.");
        } catch (err) {
            res.status(400).json("Error: " + err);
        }
    });