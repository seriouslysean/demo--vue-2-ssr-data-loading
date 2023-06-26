import { createApp } from '~/app';

const { app, store } = createApp();

if (window.__INITIAL_STATE__) {
  // We initialize the store state with the data injected from the server
  store.replaceState(window.__INITIAL_STATE__);
}

app.$mount('#app');

window.app = app;

// Enable HMR during local dev
if (process.env.NODE_ENV !== 'production' && module.hot) {
  console.debug('Enabling hot module reloading');
  module.hot.accept();
}
