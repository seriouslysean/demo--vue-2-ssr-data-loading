import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import HomeView from '~/routes/home/HomeView.vue';
import ItemView from '~/routes/item/ItemView.vue';

export function createRouter() {
    return new Router({
        mode: 'history',
        routes: [
            { path: '/', component: HomeView },
            { path: '/item/:id', component: ItemView },
        ],
    });
};
