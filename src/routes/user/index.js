import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { compose } from 'recompose'

import { zcApiShapeJS, emptyString } from 'zc-core/utils/propTypes'
import { apiRequest } from 'zc-core/api/actions'
import { toJS } from 'zc-core/hocs'
import { Content, Link, Icon } from 'zc-web/components'

import { ContentSpinner, ContentError } from 'components'

import {
  selectUserName,
  selectUserEmail,
  selectUserPhoneNumber,
  selectApiState,
} from './selectors'
import styles from './style.scss'

class User extends React.Component {
  componentDidMount() {
    this.props.fetchUser()
  }
  componentWillReceiveProps(props) {
    // Changing the route via react-router doesn't actually unmount the component so this
    // triggers a fetch if the user clicks a Link to a different userId
    if (props.userId !== this.props.userId && !props.api.pending) props.fetchUser()
  }
  render() {
    const { name, email, phone, api, match } = this.props
    if (email) return (
      <Content
        title={name}
        actionItems={[
          { title: 'Edit', icon: 'CREATE', route: `${match.url}/edit` },
        ]}
        className={styles.User}
      >
        <h3><Icon name="MAIL" size={24} /><Link href={`mailto:${email}`}>{email}</Link></h3>
        {phone && <h3><Icon name="CALL" size={24} /><Link href={`tel:${phone}`}>{phone}</Link></h3>}
      </Content>
    )
    if (api.error) return (<ContentError>
      The requested user failed to fetch, check the URL or view all accessible
      users <Link route="/user">here</Link>
    </ContentError>)
    return <ContentSpinner />
  }
}

User.propTypes = {
  userId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  api: zcApiShapeJS.isRequired,
  fetchUser: PropTypes.func.isRequired,
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
}

const mapStateToProps = (state, props) => {
  const userId = props.match.params.userId
  return {
    name: selectUserName(state, { userId }),
    email: selectUserEmail(state, { userId }),
    phone: selectUserPhoneNumber(state, { userId }),
    userId,
    api: selectApiState(state, { userId }),
  }
}

const mapDispatchToProps = (dispatch, props) => ({
  fetchUser: () => dispatch(apiRequest(
    'getUser',
    { userId: props.match.params.userId },
  )),
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  toJS,
)(User)
