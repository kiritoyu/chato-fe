import Sensors from '@/utils/sensors'
import type { App } from 'vue'

export default function useSensors(app: App<Element>) {
  if (!import.meta.env.VITE_APP_SENSORS_URL) {
    console.log(
      'Sensors has not been introduced, please configure your Sensors API in env if necessary.'
    )
    return null
  }

  const sensors = new Sensors()

  app.config.globalProperties.$sensors = sensors.saInstance

  return sensors
}
