const express = require('express')
const app = express()

// For /time path, simulates a delay of 2s before sending a response:
app.get('/time', (req, res) => {
  setTimeout(() => {
    res.send(new Date().toTimeString())
  }, 2000)
})

// For /date path, simulates a delay of 2s before sending a failed response:
app.get('/date', (req, res) => {
  setTimeout(() => {
    res.destroy(new Error('Internal Server Error'))
  }, 2000)
})

// Listen on port 1337 for new connections
app.listen(
  1337,
  () => console.log('API server running on port 1337'),
)