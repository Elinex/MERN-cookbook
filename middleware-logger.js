const logger = (options) => (request, response, next) => {
  if (typeof options === 'object'
    && options !== null
    && options.enable){
    console.log(
      'Status code: ', response.statusCode,
      'URL: ', request.originalUrl
    )
  }
  next()
}

module.exports = logger