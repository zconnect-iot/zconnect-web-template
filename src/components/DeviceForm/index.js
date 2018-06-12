import React from 'react'
import PropTypes from 'prop-types'

import {
  TextField,
} from 'zc-web/widgets/forms/index'


export default function DeviceForm({ handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      <TextField name="name" label="Name" />
    </form>
  )
}
DeviceForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
}
