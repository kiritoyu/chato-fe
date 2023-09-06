import { defineStore } from 'pinia'

export const sidebarStore = defineStore('sidebar', {
  state: () => {
    return {
      drawerVisible: false // 导航抽屉 visible
    }
  },
  actions: {}
})
