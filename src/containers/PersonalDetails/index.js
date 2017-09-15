import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form/immutable'
import classNames from 'classnames'

import {
  TextField,
  EmailField,
  PasswordField,
  CheckboxField,
  SelectField,
} from 'zc-web/widgets/forms/index'

import styles from './style.scss'

const personalDetails = ({handleSubmit}) => <form
  onSubmit={handleSubmit}
  className={classNames('personal-details', styles.form)}
>
  <div className={styles.formHeader}>Personal details</div>
  <div className={styles.formBody}>
    <TextField name='firstName' label='First name' />
    <EmailField
      name='email'
      label='Email address'
      placeholder='johnsmith@email.com'
    />
    <PasswordField name='password' label='Password' placeholder='******' />
    <CheckboxField name='keepUpdated' label='Keep me up-to-date' />
    <SelectField name='userType' label='User type'>
      <option value='onsite'>On-site</option>
      <option value='offsite'>Off-site</option>
    </SelectField>
  </div>
</form>

export default reduxForm({
  form: 'personalDetails',
})(personalDetails)
