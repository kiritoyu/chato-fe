import { sidebarStore } from '@/stores/sidebar'
import { storeToRefs } from 'pinia'

export default function useSidebar() {
  const sideBarStoreI = sidebarStore()
  const { drawerVisible } = storeToRefs(sideBarStoreI)

  return { drawerVisible }
}
