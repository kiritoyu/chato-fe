import { randomString } from '@/utils/help'
import { useCookies } from '@vueuse/integrations/useCookies'

export default function useLocationDvid() {
  const DVID_KEY = 'chato-dvid'

  let dvid = localStorage.getItem(DVID_KEY)

  if (!dvid) {
    dvid = randomString(32)
    localStorage.setItem(DVID_KEY, dvid)
  }

  useCookies().set('dvid', dvid)

  return { dvid }
}
