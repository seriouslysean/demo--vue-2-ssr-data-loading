<template>
    <div class="route-path">
        <p>{{ routePath }}</p>
    </div>
</template>

<script>
export default {
    name: 'RoutePath',
    computed: {
        routePath() {
            return this.$route?.path ?? 'unknown';
        },
    },
}
</script>

<style>
.route-path {
    color: #000;
}
</style>
