import { createApp } from '~/app';

const { app } = createApp();

app.$mount('#root');

window.app = app;
