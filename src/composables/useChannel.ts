import qs from 'query-string'
import { ref } from 'vue'

export default function useChannel() {
  const SHARE_CHANNEL_KEY = 'chato-share-channel'

  const channel = ref('')

  const routerChannel = (qs.parseUrl(window.location.href).query.channel as string) || ''

  const setChannel = (val: string) => {
    localStorage.setItem(SHARE_CHANNEL_KEY, val)
  }

  if (!channel.value && routerChannel) {
    localStorage.setItem(SHARE_CHANNEL_KEY, routerChannel)
  }

  if (routerChannel && channel.value !== routerChannel) {
    localStorage.removeItem(SHARE_CHANNEL_KEY)
    localStorage.setItem(SHARE_CHANNEL_KEY, routerChannel)
  }

  channel.value = localStorage.getItem(SHARE_CHANNEL_KEY) || ''

  return {
    shareChannel: channel,
    setShareChannel: setChannel
  }
}
