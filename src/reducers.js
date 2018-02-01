import auth from 'zc-core/auth/reducer'
import api from 'zc-core/api/reducer'
import locale from 'zc-core/locale/reducer'
import { reducer as form } from 'redux-form/immutable'
import { createResponsiveStateReducer } from 'redux-responsive'

import user from 'containers/User/reducer'


const browser = createResponsiveStateReducer({
  extraSmall: 500,
  small: 768,
  medium: 1024,
  large: 1200,
  extraLarge: 1400,
})

export default {
  auth,
  api,
  locale,
  form,
  browser,
  user,
}
