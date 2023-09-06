import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

export function useBasicLayout() {
  const breakpoints = useBreakpoints(breakpointsTailwind)
  const isMobile = breakpoints.smaller('lg')

  return { isMobile }
}

export function useIsMobile() {
  const userAgentInfo = navigator.userAgent
  const agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod']
  const isExist = agents.filter((item) => userAgentInfo.includes(item))
  return isExist.length ? true : false
}
