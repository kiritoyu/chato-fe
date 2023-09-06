import * as components from '@element-plus/icons-vue'

export default {
  install: (app: any) => {
    for (const key in components) {
      const componentConfig = components[key as keyof typeof components]
      app.component(componentConfig.name, componentConfig)
    }
  }
}
