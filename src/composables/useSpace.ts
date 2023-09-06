import type { IUserInfo } from '@/interface/user'
import { RoutesMap } from '@/router'
import { useAuthStore } from '@/stores/auth'
import { useBase } from '@/stores/base'
import { useChatStore } from '@/stores/chat'
import { useDomainStore } from '@/stores/domain'
import { useSpaceStore } from '@/stores/space'
import { isManagerRole } from '@/utils/help'
import { ElLoading, ElNotification } from 'element-plus'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

export default function useSpace() {
  const router = useRouter()
  const baseStoreI = useBase()
  const authStoreI = useAuthStore()
  const domainStoreI = useDomainStore()
  const chatStoreI = useChatStore()
  const spaceStoreI = useSpaceStore()

  const { orgInfoList } = storeToRefs(baseStoreI)

  const switchSpace = async (spaceId: number, newSpaceState?: Partial<IUserInfo>) => {
    if (!spaceId) {
      ElNotification.error('空间切换失败：未传递切换空间 ID')
      return
    }

    const spaceItem = {
      ...(orgInfoList.value || []).find((i) => i.org.id === spaceId),
      ...newSpaceState
    }
    if (!spaceItem) {
      ElNotification.error('空间切换失败：未找到该空间')
      return
    }

    const loading = ElLoading.service({
      lock: true,
      text: '切换空间中...',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    try {
      authStoreI.setToken(spaceItem.token)
      await baseStoreI.updateUserInfo(spaceItem)
      await Promise.all([
        domainStoreI.initDomainList(),
        spaceStoreI.initSpaceQuota(),
        spaceStoreI.initSpaceRights(),
        chatStoreI.initChatList()
      ])
      router.replace({
        name: isManagerRole(spaceItem.role) ? RoutesMap.manager.center : RoutesMap.resource
      })
    } catch (err) {
    } finally {
      loading.close()
    }
  }

  return {
    switchSpace
  }
}
