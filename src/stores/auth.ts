import { removeCookie } from '@/utils/help'
import { useStorage } from '@vueuse/core'
import { useCookies } from '@vueuse/integrations/useCookies'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const cookieToken = useCookies(['auth_token'])?.get('auth_token') || ''
  const storageToken = useStorage('auth_token', '')

  const authToken = ref('')

  if (storageToken.value) {
    authToken.value = storageToken.value
  } else if (cookieToken) {
    authToken.value = cookieToken
  }

  const setToken = (token: string) => {
    authToken.value = token
    storageToken.value = token
  }

  const logout = () => {
    removeCookie('auth_token')
    setToken('')
  }

  return {
    cookieToken,
    authToken,
    logout,
    setToken
  }
})
