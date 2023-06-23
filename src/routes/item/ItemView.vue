<template>
    <div class="item-view">
        <h1>Item View</h1>
        <p>{{ item ?? 'Not Loaded' }}</p>
    </div>
</template>

<script>
export default {
    name: 'ItemView',
    computed: {
        // display the item from store state.
        item () {
            return this.$store.state.items[this.$route.params.id];
        },
    },
    // Server-side only
    // This will be called by the server renderer automatically
    serverPrefetch() {
        // return the Promise from the action
        // so that the component waits before rendering
        return this.fetchItem();
    },
    // Client-side only
    mounted() {
        // If we didn't already do it on the server
        // we fetch the item (will first show the loading text)
        if (!this.item) {
            this.fetchItem();
        }
    },
    // Client side to catch param change
    watch: {
        '$route.params.id': {
            handler() {
                // If we change between the same route with a different param
                // we need to fetch the item again
                if (!this.item) {
                    this.fetchItem();
                }
            },
        },
    },
    methods: {
        fetchItem() {
            // return the Promise from the action
            return this.$store.dispatch('fetchItem', this.$route.params.id);
        },
    },
}
</script>
