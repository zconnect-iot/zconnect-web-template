import Raven from 'raven-js'
import AppSettings from 'config/AppSettings'


if (process.env.NODE_ENV === 'production') Raven.config(AppSettings.ravenDSN, {
  release: process.env.COMMITHASH,
  maxBreadcrumbs: 50,
  dataCallback: data => ({
    ...data,
    extra: {
      ...data.extra,
      reduxState: data.extra.reduxState ? data.extra.reduxState.toJS() : null,
    },
  }),
  debug: process.env.NODE_ENV !== 'production',
}).install()


export default ({ getState }) => next => (action) => {
  const isSetup = Raven.isSetup()
  try {
    if (isSetup && !action.type.includes('@@redux-form')) {
      // Set extra context on every action but only convert toJS if sending to Sentry
      Raven.setExtraContext({ reduxState: getState() })
      Raven.captureBreadcrumb({
        category: 'redux',
        level: 'info',
        message: action.type,
        data: action,
      })
    }
    return next(action)
  }
  catch (err) {
    console.error.bind(console, '[sentry-middleware] Reporting error to Sentry:')
    if (isSetup) Raven.captureException(err, {
      extra: {
        action,
        reduxState: getState(),
      },
    })
  }
}
