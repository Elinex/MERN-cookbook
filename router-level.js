const express = require('express')
const app = express()
const router = express.Router()

// Define our logger middleware function:
router.use((request, response, next) => {
  console.log('URL: ', request.originalUrl)
  next()
})

// Mount the Router to the path "/router"
app.use('/router', router)

app.listen(
  1337,
  () => console.log('Web Server running on port 1337'),
)