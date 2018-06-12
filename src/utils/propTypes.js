import PropTypes from 'prop-types'
import moment from 'moment'

import { locationShape } from 'zc-core/utils/propTypes'

export const oneOfOrgLevels = PropTypes.oneOf([
  'distributor',
  'company',
  'site',
  'space',
])

export const roles = [
  'admin',
  'distributor',
  'company',
  'site',
  'space',
  'user',
]

export const oneOfRoles = PropTypes.oneOf(roles)

const distributorDashboards = [
  'default',
]

const companyDashboards = [
  'default',
  'company_dashboard',
]

const siteDashboards = [
  'default',
  'site_dashboard',
]

const spaceDashboards = [
  'default',
  'space_dashboard',
]

export const oneOfDistributorDashboards = PropTypes.oneOf(distributorDashboards)

export const distributorDashboardTypes = PropTypes.arrayOf(oneOfDistributorDashboards)


export const oneOfCompanyDashboards = PropTypes.oneOf(companyDashboards)

export const companyDashboardTypes = PropTypes.arrayOf(oneOfCompanyDashboards)


export const oneOfSiteDashboards = PropTypes.oneOf(siteDashboards)

export const siteDashboardTypes = PropTypes.arrayOf(oneOfSiteDashboards)


export const oneOfSpaceDashboards = PropTypes.oneOf(spaceDashboards)

export const spaceDashboardTypes = PropTypes.arrayOf(oneOfSpaceDashboards)

export const oneOfAllDashboards = PropTypes.oneOf([
  ...siteDashboards,
  ...companyDashboards,
  ...distributorDashboards,
  ...spaceDashboards,
])

const colors = [
  'primary',
  'secondary',
  'success',
  'danger',
  'warning',
  'info',
]

export const oneOfThemeColors = PropTypes.oneOf(colors)

export const isMoment = PropTypes.instanceOf(moment)

export const emptyString = (props, name, component) => {
  if (props[name] !== '') return new Error(`${component} expected empty string for ${name}, received ${props[name]}`)
  return undefined
}

// Stubs
export const stubShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
})

export const arrayOfStubs = PropTypes.arrayOf(stubShape)

// Space

export const spaceShape = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
  location: locationShape,
  dashboards: PropTypes.arrayOf(oneOfSpaceDashboards),
  devices: arrayOfStubs,
  site: stubShape,
  logo: PropTypes.string,
})

// Site

export const siteShape = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
  location: locationShape,
  dashboards: PropTypes.arrayOf(oneOfSiteDashboards),
  devices: arrayOfStubs,
  spaces: arrayOfStubs,
  company: stubShape,
  logo: PropTypes.string,
})

// Company

export const companyShape = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
  location: locationShape,
  dashboards: PropTypes.arrayOf(oneOfCompanyDashboards),
  sites: arrayOfStubs,
  distributor: stubShape,
  logo: PropTypes.string,
})

// Distributor

export const distributorShape = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
  location: locationShape,
  dashboards: PropTypes.arrayOf(oneOfDistributorDashboards),
  companies: arrayOfStubs,
  logo: PropTypes.string,
})
