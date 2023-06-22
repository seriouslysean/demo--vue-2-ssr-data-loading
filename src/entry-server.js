import { createApp } from '~/app';

export default context => {
  return new Promise((resolve, reject) => {
    const { app, router } = createApp();

    // set server-side router's location
    router.push(context.url);

    resolve(app);
  });
}
