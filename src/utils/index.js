import { connect } from 'react-redux'
import { plugins } from 'griddle-react'
import { Map, List } from 'immutable'

import { emptyMap, emptyList } from 'zc-core/utils'


// Helper HOC for passing row data to griddle column
export const withRowData = connect((state, props) => {
  const rowData = plugins.LocalPlugin.selectors.rowDataSelector(state, props)
  return {
    rowData,
  }
})

/* Validators */

export const isEmail = value =>
  (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined)

export const isPhoneNumber = value =>
  (value && !/^\+?[0-9]{11,}/.test(value)
    ? 'Invalid phone number'
    : undefined)

export const required = value => (!value && 'Required')

export const minLength = value => (value && value.length < 8 && 'Must be at least 8 characters')

// Only works if first password field is named password
export const passwordsMatch = (value, fields) => (value !== fields.get('password') && "Passwords don't match")
