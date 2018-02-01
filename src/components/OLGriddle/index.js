import React from 'react'
import PropTypes from 'prop-types'
import Griddle, { plugins } from 'griddle-react'

import LayoutContainer from './LayoutContainer'
import Filter from './Filter'
import TableBody from './TableBody'
import TableContainer from './TableContainer'
import FilterLayout from './FilterLayout'
import RecentLayout from './RecentLayout'
import NextButton from './NextButton'
import PreviousButton from './PreviousButton'

import './style.scss'


export default function List(props) {
  const { data, count, title, viewAllRoute, className, components, children, ...griddleProps } = props
  return (<Griddle
    data={data}
    styleConfig={{
      classNames: {
        Layout: className,
      },
    }}
    title={title}
    viewAll={viewAllRoute}
    pageProperties={{
      pageSize: count || 10,
    }}
    plugins={[plugins.LocalPlugin]}
    components={{
      LayoutContainer,
      Layout: count ? RecentLayout : FilterLayout,
      Filter,
      TableContainer,
      TableBody,
      NextButton,
      PreviousButton,
      ...components,
    }}
    {...griddleProps}
  >
    {children}
  </Griddle>)
}

List.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  count: PropTypes.number,
  title: PropTypes.string,
  viewAllRoute: PropTypes.string.isRequired,
  className: PropTypes.string,
  components: PropTypes.objectOf(PropTypes.any),
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
}

const emptyObject = {}

List.defaultProps = {
  count: 0,
  title: '',
  components: emptyObject,
  className: '',
  children: null,
}
