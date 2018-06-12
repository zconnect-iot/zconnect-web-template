import prodSettings from './prodSettings'
import devSettings from './devSettings'


const baseSettings = {
  loginTimeout: 30000,
  pollingInterval: 10000,
  routes: {
    devices: {
      title: 'Devices',
      icon: 'MENU',
    },
    account: {
      title: 'Account',
      icon: 'PERSON',
    },
    users: {
      title: 'Users',
      icon: 'ACCOUNT_CHILD',
    },
  },
  roles: {
    default: {
      routes: ['account'],
    },
    admin: {
      routes: ['devices', 'users'],
    },
    user: {
      routes: ['devices'],
    },
  },
}

const envSettings = process.env.NODE_ENV === 'production' ? prodSettings : devSettings

export default { ...baseSettings, ...envSettings }
