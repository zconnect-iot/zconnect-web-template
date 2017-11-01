// Convert the login POST request to GET so that a token is always returned

module.exports = (req, res, next) => {
  req.method = 'GET'
  req.query = req.body
  next()
}
