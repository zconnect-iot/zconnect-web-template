import { withProps, compose } from 'recompose'
import { Button } from 'zc-web/components'
import { withSpinner } from 'zc-web/hocs'

export default compose(
  withProps({ spinnerSize: 24 }),
  withSpinner(),
)(Button)
