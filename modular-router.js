const express = require('express')
const app = express()

// Define a router for your mini-application and add 
// a request method to handle requests for path "/home":
const miniapp = express.Router()
miniapp.get('/home', (request, response, next) => {
  const url = request.originalUrl
  response
    .status(200)
    .send(`You are visiting \home from ${url}`)
})

// Mount your modular mini-application to "/first" path, and to 
// "/second" path:
app.use('/first', miniapp)
app.use('/second', miniapp)

// Listen for new connections on port 1337:
app.listen(
  1337,
  () => console.log('Web server running on port 1337')
)


