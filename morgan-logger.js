const express = require('express')
const morgan = require('morgan')
const app = express()

// Include the morgan configurable middleware. Pass 'dev' as the 
// format we will use as the first argument to the middleware function:
app.use(morgan('dev'))

// Define a route method to handle all GET requests:
app.get('*', (request, response, next) => {
  response.send('Hello Morgan!')
})

// Listen on port 1337 for new connections:
app.listen(
  1337,
  () => console.log('Web Server running on port 1337'),
)
