<template>
    <div class="header-module">
        <router-link to="/">
            <h2>Ithaca Web People</h2>
        </router-link>
    </div>
</template>

<script>
    export default {
        name: 'header-module'
    }
</script>

<style>
    .header-module {
        background-color: #39393b;
        position: fixed;
        padding: 45px 60px;
        right: 0;
        left: 0;
        top: 0;
    }
    .header-module a {
        text-decoration: none;
    }
    .header-module h2 {
        text-transform: uppercase;
        letter-spacing: 2px;
        font-weight: 400;
        font-size: 18px;
        margin: 0;
    }
</style>
