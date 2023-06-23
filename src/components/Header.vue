<template>
    <header class="header">
        <h1>Vue SSR</h1>
        <ul>
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/item/1">Item #1</router-link></li>
            <li><router-link to="/item/2">Item #2</router-link></li>
        </ul>
    </header>
</template>

<script>
export default {
    name: 'Header',
}
</script>

<style>
.header {
  background: #ccc;
}
</style>
