<template>
    <div class="wrapper">
        <header-module></header-module>
        <router-view></router-view>
    </div>
</template>

<script>
    import headerModule from './components/header-module.vue'
    import router from './router'
    // import store from 'src/store'

    export default {
        el: '#app',
        components: {
            'header-module': headerModule
        },
        router: router
    }
</script>

<style>
    body {
        background-color: #39393b;
        font-family: 'Brown';
        line-height: 2em;
        font-weight: 300;
        color: #ffffff;
        margin: 0;
        -webkit-font-smoothing: antialiased;
        text-shadow: 1px 1px 1px rgba(0,0,0,0.004);
    }
    h1, h2, h3, h4, h5, h6 {
        font-weight: 400;
    }
    a {
        color: #ffffff;
    }
    .wrapper main {
        padding: 90px 60px 60px;
    }
    main h3 {
        /*text-transform: uppercase;*/
        /*letter-spacing: 2px;*/
        /*font-weight: 300;*/
        font-size: 20px;
    }
</style>
