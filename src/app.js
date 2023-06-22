import Vue from 'vue';

import App from '~/App.vue';
import { createRouter } from '~/router';

// export a factory function for creating fresh app, router and store
// instances
export function createApp() {
    const router = createRouter();
    const app = new Vue({
        // the root instance simply renders the App component.
        render: h => h(App),
        router,
    });
    return { app, router };
}