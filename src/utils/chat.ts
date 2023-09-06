import { ChatMessageImgLimit_Size_800 } from '@/constant/chat'
import { validateURL } from './validate'

export const formatChatMessageAnswer = ({
  content,
  lastContent = '',
  type = 'text'
}: {
  content: string
  lastContent?: string
  type?: 'text' | 'mj_image'
}) => {
  if (type === 'mj_image') {
    return validateURL(content) ? `${content}${ChatMessageImgLimit_Size_800}` : content
  } else {
    return lastContent + content
  }
}
