import { withPaginationProps } from 'zc-web/hocs'

import Devices from './Devices'

// Provides currentPage, pageSize from route params and onNext, onPrevious, onGetPage callbacks
// that push new search strings to url for navigating the table
export default withPaginationProps({ storeKey: 'devices' })(Devices)
