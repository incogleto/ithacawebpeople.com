<template>
    <div class="wrapper">
        <header-module></header-module>
        <home></home>
        <router-view></router-view>
    </div>
</template>

<script>
    import headerModule from './components/header-module.vue'
    import home from 'src/client/components/home.vue'
    import router from './router'
    // import store from 'src/store'

    export default {
        el: '#app',
        components: {
            'header-module': headerModule,
            'home': home
        },
        router: router
    }
</script>

<style>
    body {
        background-color: #444444;
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
    ul {
        list-style-type: none;
    }
    .wrapper main {
        padding: 90px 0 60px;
    }
    main h3 {
        font-size: 28px;
    }
</style>
