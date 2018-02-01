import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { logout } from 'zc-core/auth/actions'
import { Card } from 'zc-web/views'
import { DrawerToggle, Button } from 'zc-web/components'

import { selectFullName } from './selectors'

import style from './style.scss'


class UserToggle extends React.PureComponent {
  render() {
    return (
      <DrawerToggle className={style.UserToggle} iconName="PERSON" position="right">

        <Card title={this.props.name}>
          <div className={style.UserToggleContent}>
            <Button hollow action={this.props.logout}>
              Logout
            </Button>
          </div>
        </Card>
      </DrawerToggle>
    )
  }
}

UserToggle.propTypes = {
  logout: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  name: selectFullName(state),
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserToggle)
