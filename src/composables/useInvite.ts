import qs from 'query-string'
import { ref } from 'vue'

export default function useInvite() {
  const invite_ticket = ref(qs.parseUrl(window.location.href).query.invite_ticket || '')

  return {
    invite_ticket
  }
}
