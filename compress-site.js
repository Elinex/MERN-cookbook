const express = require('express')
const compression = require('compression')
const app = express()

// Include the compression middleware function. Specify the level 
// of compression to 9 (best compression) and threshold, or minimum 
// size in bytes that the response should have to consider compressing 
// the response body, to 0 bytes:
app.use(compression({ level: 9, threshold: 0 }))

// Define a route method to handle GET requests for path "/" which 
// will serve a sample HTML content that we expect to be compressed 
// and will print the encodings that the client accepts:
app.get('/', (request, response, next) => {
  response.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <title>WebApp powered by ExpressJS</title>
    </head>
    <body>
      <section role="application">
        <h1>Hello! this page is compressed!</h1>
      </section>
    </body>
    </html>
  `)
  console.log(request.acceptsEncodings())
})

app.listen(
  1337,
  () => console.log('Web Server running on port 1337'),
)

// How it works...
// The output of the Terminal will show the content encoding 
// mechanism that the client (for example web browser) supports. 
// It may look something like this:
// [ 'gzip', 'deflate', 'sdch', 'br', 'identity' ]