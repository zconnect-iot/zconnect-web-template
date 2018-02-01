import prodSettings from './prodSettings'
import devSettings from './devSettings'

const baseSettings = {
  defaultTimeout: 30000,
  pollingInterval: 4000,
  ravenDSN: '<RAVENDSN Here>',
}

const envSettings = process.env.NODE_ENV === 'production' ? prodSettings : devSettings

export default { ...baseSettings, ...envSettings }
