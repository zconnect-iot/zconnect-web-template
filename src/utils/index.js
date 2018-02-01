import deviceSVG from 'assets/device.svg'
import gatewaySVG from 'assets/gateway.svg'
import serverSVG from 'assets/server.svg'
import uiSVG from 'assets/ui.svg'
import unknownSVG from 'assets/unknown.svg'


export const typeSvgMap = {
  device: deviceSVG,
  gateway: gatewaySVG,
  server: serverSVG,
  ui: uiSVG,
  unknown: unknownSVG,
}

export const getImageForNodeType = type => typeSvgMap[type]

export const addQueryToUrl = (search, props) => {
  // Use .replace as do not want to keep adding to history everytime a event is selected
  props.history.replace(`${props.location.pathname}${search}`)
}

export const removeQueryFromUrl = (search, props) => {
  // Use .replace as do not want to keep adding to history everytime a event is selected
  props.history.replace(props.location.pathname)
}

export const toCaps = str => str.charAt(0).toUpperCase() + str.slice(1)

export const timeSince = (date) => {
  const seconds = Math.floor((new Date() - date) / 1000)
  const tag = (duration, units) => `${duration} ${units}${duration > 1 ? 's' : ''} ago`

  const timeMap = [
    ['year', 31536000],
    ['month', 2592000],
    ['week', 604800],
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
  ]
  for (let i = 0; i < timeMap.length; i += 1) {
    const [unit, interval] = timeMap[i]
    const duration = Math.floor(seconds / interval)
    if (duration >= 1) return tag(duration, unit)
  }
  return 'Less than a minute ago'
}
