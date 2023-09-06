import { getCurrentInstance } from 'vue'

export default function useGlobalProperties() {
  const instance = getCurrentInstance()

  return {
    ...instance?.appContext?.app?.config?.globalProperties
  }
}
