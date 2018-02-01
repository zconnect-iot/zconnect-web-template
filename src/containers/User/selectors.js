import { createSelector } from 'reselect'


const selectUserDomain = state => state.get('user')


const selectFirstName = createSelector(
  selectUserDomain,
  user => user.get('fname', ''),
)

const selectLastName = createSelector(
  selectUserDomain,
  user => user.get('lname', ''),
)

export const selectFullName = createSelector(
  selectFirstName,
  selectLastName,
  (first, last) => `${first} ${last}`,
)
