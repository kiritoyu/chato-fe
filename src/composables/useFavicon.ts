import { getCurrentEnv } from '@/config'

export default function useFavicon() {
  const env = getCurrentEnv()
  if (env === 'prod') return

  const elemLink = document.head.querySelector('link[rel~=icon][href]:not([href=""])')
  if (!elemLink) return

  const file = (elemLink as any).href
  ;(elemLink as any).href = file.replace('/favicon.', `/favicon.${env}.`)
}
