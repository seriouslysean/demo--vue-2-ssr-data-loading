# Vue 2 SSR Data Loading Demo

Example implementation of the Vue 2 data loading pattern suggested in the SSR documentation, https://v2.ssr.vuejs.org/.

No Hot Module Reloading

## Explanation

- 2 different bundles, `server` + `client` via webpack
- Server rendered content that waits for data to be fetched using `serverPrefetch` via an action from the Vuex store
- Client side data loading via the `mounted` hook and a watcher

## Run Locally

To run this locally:

- Pull down the repo
- Run `npm ci`
- Run `npm run start`
- Go to http://localhost:3000/ in your browser
