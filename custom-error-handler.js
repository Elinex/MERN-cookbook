const express = require('express')
const app = express()

// Define a new Route Method to handle GET requests for 
// path "/" and throw an error every time:
app.get('/', (request, response, next) => {
  try{
    throw new Error('Oh no!, something went wrong!')
  } catch(err){
    next(err)
  }
})

// Define a custom error handler middleware function to send 
// the error message back to the client's browser:
app.use((error, request, response, next) => {
  response.end(error.message)
})

app.listen(
  1337,
  () => console.log('Web Server running on port 1337'),
)