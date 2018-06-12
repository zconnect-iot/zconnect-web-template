const jsonServer = require('json-server')
const url = require('url')
const XDate = require('xdate')

const server = jsonServer.create()
const router = jsonServer.router('devServer/db.json')
const defaultMiddlewares = jsonServer.defaults({ bodyParser: true })

server.use(defaultMiddlewares)

server.use(jsonServer.rewriter({
  '/api/v3/login/': '/login',
  '/api/v3/users/': '/users',
  '/api/v3/users/:userId/subscriptions/:subId/': '/subscriptions/:subId',
  '/api/v3/users/:userId/subscriptions/': '/subscriptions',
  '/api/v3/users/:userId/': '/users/:userId',
  '/api/v3/devices/:deviceId/data/': '/data',
  '/api/v3/devices/:deviceId/activity_stream/?page=:page&page_size=:page_size': '/activities',
  '/api/v3/devices/:deviceId/': '/devices/:deviceId',
  '/api/v3/devices/?page=:page&page_size=:page_size': '/devices',
}))

server.use((req, res, next) => {
  if (req.url === '/login') {
    req.method = 'GET'
    if (req.body.username === 'admin@zoetrope.io') req.url = '/login-admin'
    else req.url = '/login-user'
  }
  next()
})

router.render = (req, res) => {
  setTimeout(() => {
    const { pathname } = url.parse(req.url)
    // Nest some responses in results key to emulate api paginated response shape
    if (pathname === '/users' ||
      pathname === '/devices/' ||
      (pathname === '/subscriptions' && req.method !== 'POST') ||
      pathname === '/activities') return res.jsonp({
      results: res.locals.data,
      count: 25,
    })
    // Get some mock time series data
    if (/\/devices\/.*\/data/.test(req.path)) {
      const data = []
      let ts = new XDate()
      for (let i = 0; i < 24; i += 1) {
        ts = new Date(ts - (1000 * 60 * 60))
        data.push({
          ts: ts.toISOString(),
          value: Math.floor(Math.random() * 10),
        })
      }
      return res.status(200).jsonp({
        data: {
          door_open_time: data.reverse(),
          panic: data.reverse(),
          soft_close: data.reverse(),
        },
      })
    }
    return res.jsonp(res.locals.data)
  }, 1000)
}

server.use(router)

server.listen(4000, () => {
  console.log('JSON Server is running')
})
