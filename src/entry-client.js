import { createApp } from './app'

// client-specific bootstrapping logic...

const { app } = createApp()

// this assumes App.vue template root element has `id="root"`
app.$mount('#root')
