import Vue from 'vue';
import { sync } from 'vuex-router-sync';

import App from '~/App.vue';
import { createRouter } from '~/router';
import { createStore } from '~/store';

// export a factory function for creating fresh app, router and store
// instances
export function createApp() {
    // create router and store instances
    const router = createRouter();
    const store = createStore();

    // sync so that route state is available as part of the store
    sync(store, router);

    const app = new Vue({
        // the root instance simply renders the App component.
        render: h => h(App),
        router,
        store,
    });

    return { app, router, store };
}
