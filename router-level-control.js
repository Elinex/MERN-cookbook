const express = require('express')
const app = express()
const router = express.Router()

// Define our logger middleware function inside the router:
router.use((request, response, next) => {
  if(!request.query.id){
    next('router') //Next, out of Router
  } else {
    next() //Next, in Router
  }
})

// Add a route method to handle GET requests for path "/" which will be executed
// only if the middleware function passes control to it:
router.get('/', (request, response, next) => {
  const id = request.query.id
  response.send(`You specified a user ID => ${id}`)
})

// Add a route method to handle GET requests for path "/" outside of 
// the router. However, include the router as a route handler as 
// the second argument, and another route handler to handle the 
// same request only if the router passes control to it:
app.get('/', router, (request, response, next) => {
  response
    .status(400)
    .send('A user ID needs to be specified')
})

app.listen(
  1337,
  () => console.log('Web Server running on port 1337'),
)