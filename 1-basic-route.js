// Include the ExpressJS library first and initialize a new 
// ExpressJS application:
const express = require('express')
const app = express()

// Add a new route method to handle requests for the path "/". 
// The first argument specifies the path or URL, the next argument 
// is the route handler. Inside the route handler, let's use the 
// response object to send a status code 200 (OK) and text to the 
// client:
app.get('/', (request, response, nextHandler) => {
  response.status(200).send('Hello from ExpressJS')
})

// Use the listen method to accept new connections on port 1337:
app.listen(1337, () => console.log('Web server running on port 1337'))