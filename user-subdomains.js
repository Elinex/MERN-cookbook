const express = require('express')
const vhost = require('vhost')
const app = express()

// Define a new router. Then, add a route method to handle GET requests 
// on path "/". Use the vhost object to access the array of subdomains:
const users = express.Router()
users.get('/', (request, response, next) => {
  const username = request
    .vhost[0]
    .split('-')
    .map(name => (
      name[0].toUpperCase() +
      name.slice(1)
    ))
    .join(' ')
  response.send(`Hello, ${username}`)
})

// Mount the router:
app.use(vhost('*.localhost', users))

// Listen on port 1337 for new connections:
app.listen(
  1337,
  () => console.log('Web Server running on port 1337'),
)
