const express = require('express')
const path = require('path')
const app = express()

// Define a router:
const staticRouter = express.Router()

// Use the express.static configurable middleware function to include 
// both directories, public and another-public:
const assets = {
  first: path.join(__dirname, './public'),
  second: path.join(__dirname, './another-public')
}

staticRouter
  .use(express.static(assets.first))
  .use(express.static(assets.second))

//  Mount the Router to the "/" path: 
app.use('/', staticRouter)

// Note: With tis approach, two different files in different locations 
// were served under one path

app.listen(
  1337,
  () => console.log('Web Server running on port 1337'),
)