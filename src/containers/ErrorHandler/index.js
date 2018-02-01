import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Col } from 'react-flexbox-grid'

import { logout } from 'zc-core/auth/actions'
import { selectUserLoggedIn } from 'zc-core/auth/selectors'
import { Modal } from 'zc-web/views'
import { SimpleLink, Codeblock } from 'zc-web/components'
import docsBookPNG from 'assets/docs-book.png'


function ErrorHandler({ retry, logoutUser, loggedIn, error, children }) {
  return (
    <Modal title="Something went wrong" onClose={retry}>
      <Row >
        <Col xs={3}>
          <img src={docsBookPNG} alt="underline" />
        </Col>
        <Col xs={9}>
          { children ||
            <div>
              <h4>
                Overlock encountered an error. Click <SimpleLink action={retry}>here</SimpleLink> to try again.
              </h4>
              <h4>{"If that doesn't work try reloading your browser."}</h4>
              {loggedIn && <h4>Alternatively, <SimpleLink action={logoutUser}>log out</SimpleLink> and try again.</h4>}
              <h4>Please contact support if the problem perists.</h4>
              <br />
              { error &&
                <div>
                  <h4>Error details:</h4>
                  <Codeblock>{error.name} - {error.message}</Codeblock>
                </div>
              }
            </div>
          }
        </Col>
      </Row>
    </Modal>
  )
}

ErrorHandler.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  retry: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  error: PropTypes.shape({
    name: PropTypes.string,
    message: PropTypes.string,
  }),
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
}

ErrorHandler.defaultProps = {
  children: null,
  error: null,
}

const mapStateToProps = state => ({
  loggedIn: selectUserLoggedIn(state),
})

const mapDispatchToProps = (dispatch, props) => ({
  logoutUser: () => {
    dispatch(logout())
    props.retry()
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ErrorHandler)
