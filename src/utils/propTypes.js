import PropTypes from 'prop-types'
import moment from 'moment'

const colors = [
  'primary',
  'secondary',
  'success',
  'danger',
  'warning',
  'info',
]

export const oneOfThemeColors = PropTypes.oneOf(colors)

export const isMoment = PropTypes.instanceOf(moment)

export const emptyString = (props, name, component) => {
  if (props[name] !== '') return new Error(`${component} expected empty string for ${name}, received ${props[name]}`)
  return undefined
}

// Stubs
export const stubShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
})

export const arrayOfStubs = PropTypes.arrayOf(stubShape)
