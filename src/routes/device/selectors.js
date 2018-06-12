import { createSelector } from 'reselect'
import { Map, fromJS } from 'immutable'
import XDate from 'xdate'
import { times } from 'lodash'

import { selectResponse, selectErrorDetail, selectAPIState } from 'zc-core/api/selectors'

import { emptyList, emptyMap } from 'zc-core/utils'
import endpoints from 'config/endpoints'


const selectDeviceIdFromProps = (_, props) => props.match.params.deviceId


// Device data
const selectDevicesResponse = state => selectResponse(state, { storeKey: 'devices' })
export const selectApiState = state => selectAPIState(state, { storeKey: 'devices' })
const selectDevicesErrorDetail = state => selectErrorDetail(state, { storeKey: 'devices' })

export const selectErrorMessage = createSelector(
  selectDevicesErrorDetail,
  detail => detail || 'An unknown data fetch error occurred',
)

export const selectDevice = createSelector(
  selectDeviceIdFromProps,
  selectDevicesResponse,
  (deviceId, devices) => devices.get(deviceId, emptyMap),
)

export const selectDeviceName = createSelector(
  selectDevice,
  device => device.get('name', ''),
)
