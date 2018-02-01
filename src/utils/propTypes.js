import PropTypes from 'prop-types'
import { typeSvgMap } from 'utils'

export const oneOfNodeTypes = PropTypes.oneOf(Object.keys(typeSvgMap))
