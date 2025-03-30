import dotenv from 'dotenv';
import express from 'express';
dotenv.config();

// Import the routes
import routes from './routes/index.js';

const app = express();

const PORT = process.env.PORT || 3001;

// TODO: Serve static files of entire client dist folder
app.use(express.static('../client/dist'))
// This sends the necessary static files from the server to the user's browser so they can see and interact with your website
// The user makes a request to the server and this allows the server to send the necessary files like html css and js so they can display it on the users screen

// TODO: Implement middleware for parsing JSON and urlencoded form data
// Middleware is stuff that sits in between requests and responses, helps modify or process things before the final response is sent
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
// These two are middleware functions, one is used to parse JSON data that comes in the request body so the server can understand
// The other parses data the comes from forms on websites and converts it to a JavaScript Object

// TODO: Implement middleware to connect the routes
app.use(routes);

// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
