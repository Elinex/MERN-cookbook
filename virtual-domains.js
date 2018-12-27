const express = require('express')
const vhost = require('vhost')
const app = express()

// Define two routers that we will use to build two mini-applications:
const app1 = express.Router()
const app2 = express.Router()

// Add a route method to handle GET requests for path "/" in the
// first router:
app1.get('/', (request, response, next) => {
  response.send('This is the main application.')
})

// Add a route method to handle GET requests for path "/" in the 
// second router:
app2.get('/', (request, response, next) => {
  response.send('This is a second application.')
})

// Mount our routers to our ExpressJS application. Serve the first 
// application under localhost and the second under second.localhost:
app.use(vhost('localhost', app1))
app.use(vhost('second.localhost', app2))

// Listen on port 1337 for new connections:
app.listen(
  1337,
  () => console.log('Web Server running on port 1337'),
)