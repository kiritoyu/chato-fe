import * as Sentry from '@sentry/vue'
import type { App } from 'vue'
import type { Router } from 'vue-router'

export default function useSentry(app: App<Element>, router: Router) {
  if (!import.meta.env.VITE_APP_SENTRY_DSN) {
    console.log(
      'Sentry has not been introduced, please configure your Sentry dsn in env if necessary.'
    )
    return
  }

  Sentry.init({
    app,
    dsn: import.meta.env.VITE_APP_SENTRY_DSN,
    integrations: [
      new Sentry.BrowserTracing({
        routingInstrumentation: Sentry.vueRouterInstrumentation(router),
        idleTimeout: 3000
      })
    ],
    tracesSampleRate: 1.0,
    environment: import.meta.env.VITE_APP_ENV
  })
}
