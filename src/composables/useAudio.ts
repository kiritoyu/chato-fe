import { useLocalStorage } from '@vueuse/core'
import { onUnmounted, ref } from 'vue'

export default function useAudioPlayer() {
  const audioElement = ref(null)
  const playingAudio = ref(null)
  const isPlaying = ref(false)
  const localAudioUrl = useLocalStorage('localAudioUrl', {})

  const handlePlay = (audioUrl: string) => {
    if (playingAudio.value) {
      playingAudio.value.pause()
    }

    if (!audioElement.value) {
      audioElement.value = new Audio()
      audioElement.value.addEventListener('ended', handlePause)
    }

    audioElement.value.src = audioUrl
    audioElement.value.play()
    playingAudio.value = audioElement.value
    isPlaying.value = true
  }

  const handlePause = () => {
    if (playingAudio.value) {
      playingAudio.value.pause()
      playingAudio.value = null
      isPlaying.value = false
    }
  }

  // 判断消息是否已经缓存语音
  const checkExistAudioUrl = (id: string) => {
    return localAudioUrl.value[id] || ''
  }

  // 缓存已经加在的语音链接
  const addLocalAudioUrl = (id: string, audioUrl: string) => {
    localAudioUrl.value[id] = audioUrl
  }

  onUnmounted(() => {
    if (audioElement.value) {
      handlePause()
      audioElement.value.removeEventListener('ended', handlePause)
      audioElement.value = null
    }
  })

  return {
    isPlaying,
    handlePlay,
    handlePause,
    checkExistAudioUrl,
    addLocalAudioUrl
  }
}
