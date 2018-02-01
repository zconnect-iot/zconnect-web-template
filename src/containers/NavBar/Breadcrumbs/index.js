import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import IntersperseChevrons from './IntersperseChevrons'

function Breadcrumbs(props) {
  const { location, history } = props

  const onEventClick = (array, index) => {
    const routeParts = array.splice(0, index + 1)
    const route = `/${routeParts.join('/')}`
    history.push(route)
  }

  const locationArray = location.pathname.split('/').slice(1)

  const eventComponents = locationArray
    .map((crumb, index) => {
      const uppercaseCrumb = crumb.toUpperCase()
      // Last event item should not be clickable as it will already be on that page
      if (index === locationArray.length - 1)
        return (
          <span key={crumb} >
            {uppercaseCrumb}
          </span>
        )
      const onClick = () => onEventClick(locationArray, index)
      return (
        <span key={crumb} onClick={onClick} role="link" tabIndex={0} >
          {uppercaseCrumb}
        </span>
      )
    })

  return <IntersperseChevrons components={eventComponents} />
}

Breadcrumbs.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}

export default withRouter(Breadcrumbs)
