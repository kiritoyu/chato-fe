import { currentEnvConfig } from '@/config'
import { useBase } from '@/stores/base'
import { fetchEventSource } from '@microsoft/fetch-event-source'
import { handleRequestError } from './help'

export default class SSE {
  private token: string
  public abortCtrl: AbortController

  constructor() {
    const { authToken } = useBase()
    this.token = authToken
  }

  request(
    url: string,
    bodyData: Record<string, any>,
    fn?: (data: string) => void,
    initConfig?: { responseAll?: boolean }
  ) {
    const { responseAll } = initConfig || { responseAll: false }
    this.abortCtrl = new AbortController()

    return fetchEventSource(currentEnvConfig.baseURL + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token: this.token, ...bodyData }),
      signal: this.abortCtrl.signal,
      openWhenHidden: true,
      onmessage: (ev) => {
        if (!fn) {
          return
        }

        const result = JSON.parse(ev.data)
        if (responseAll) {
          fn(result)
        } else if ('code' in result && result.code === 200) {
          fn(result.data.chunk)
        } else {
          handleRequestError(result?.message || 'SSE 请求错误')
        }
      },
      onerror: (err) => {
        throw err
      }
    })
  }
}
