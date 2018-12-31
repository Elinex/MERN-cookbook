const express = require('express')
const path = require('path')
const app = express()

// Serve the Redux library on /lib path. Make sure that the path points 
// to the node_modules folder:
app.use('/lib', express.static(
  path.join(__dirname, 'node_modules', 'redux', 'dist')
))

// Serve the client application on the root path /:
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'meal-time-client.html',)
)})

// Listen for new connections on port 1337:
app.listen(
  1337,
  () => console.log('Web Server running on port 1337'),
)