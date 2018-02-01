module.exports = (req, res, next) => {
  // Queries cause weird behaviour so just removing theme
  req.query = {}
  // Convert the login POST request to GET so that a token is always returned
  if (req.path === '/login') {
    req.method = 'GET'
  }
  // JSON server requires PATCH for updating a field (POST for creating new)
  if (req.method === 'POST') req.method = 'PATCH'
  next()
}
