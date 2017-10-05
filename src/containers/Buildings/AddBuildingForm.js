import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form/immutable'
import classNames from 'classnames'

import {
  TextField,
  EmailField,
} from 'zc-web/widgets/forms/index'

const AddBuildingForm = ({ handleSubmit }) => (
  <form onSubmit={handleSubmit} className={classNames('add-building')}>
    <TextField name="name" label="Name" />
    <EmailField
      name="email"
      label="Email address"
      placeholder="johnsmith@email.com"
    />
  </form>
)
AddBuildingForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
}

export default reduxForm({
  form: 'addBuilding',
})(AddBuildingForm)
