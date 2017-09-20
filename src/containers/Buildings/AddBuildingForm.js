import React from 'react'
import { reduxForm } from 'redux-form/immutable'
import classNames from 'classnames'

import {
  TextField,
  EmailField,
} from 'zc-web/widgets/forms/index'

import styles from '../PersonalDetails/style.scss'

const AddBuildingForm = ({ handleSubmit }) => (<form
  onSubmit={handleSubmit}
  className={classNames('add-building', styles.form)}
>
  <div className={styles.formHeader}>Personal details</div>
  <div className={styles.formBody}>
    <TextField name="name" label="Name" />
    <EmailField
      name="email"
      label="Email address"
      placeholder="johnsmith@email.com"
    />
  </div>
</form>)

export default reduxForm({
  form: 'addBuilding',
})(AddBuildingForm)
