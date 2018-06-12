import { reduxForm } from 'redux-form/immutable'

import { DeviceForm } from 'components'


export default reduxForm({
  form: 'addDevice',
})(DeviceForm)
