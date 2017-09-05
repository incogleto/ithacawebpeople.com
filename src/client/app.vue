<template>
    <div :class="['wrapper', { searching }]">
        <header-module></header-module>
        <dashboard></dashboard>

        <transition name="fade">
            <div
                v-if="screenOn"
                class="screen"
                @click="$router.push('/')">
            </div>
        </transition>

        <trans-slide-left :speed="400">
            <router-view></router-view>
        </trans-slide-left>
    </div>
</template>

<script>
    import headerModule from './components/header-module.vue'
    import dashboard from './views/dashboard.vue'
    import router from './router'
    import store from './store'

    export default {
        el: '#app',
        components: {
            'header-module': headerModule,
            'dashboard': dashboard
        },
        router: router,
        store: store,
        computed: {
            screenOn () { return this.$store.state.screenOn },
            searching () { return this.$store.state.searching }
        }
    }
</script>

<style>
    body, input, button, textarea {
        font-family: 'Brown';
    }
    body {
        background-color: #444444;
        line-height: 2em;
        font-weight: 300;
        color: #ffffff;
        margin: 0;
        -webkit-font-smoothing: antialiased;
        text-shadow: 1px 1px 1px rgba(0,0,0,0.004);
    }
    ::-webkit-scrollbar {
        display: none;
    }
    h1, h2, h3, h4, h5, h6 {
        font-weight: 400;
    }
    strong {
        font-weight: 400;
    }
    a {
        color: #ffffff;
    }
    ul {
        list-style-type: none;
    }
    *:focus {
        outline: none;
    }
    button {
        transition: background 0.2s;
        -webkit-appearance: none;
        text-transform: uppercase;
        background: #39393b;
        letter-spacing: 2px;
        padding: 10px 20px;
        cursor: pointer;
        font-size: 12px;
        color: #ffffff;
        border: none;
    }
    button:hover {
        background-color: #222222;
    }

    .wrapper main {
        padding: 90px 0 60px;
    }
    main h3 {
        font-size: 28px;
    }

    .screen {
        background-color: rgba(0, 0, 0, 0.6);
        z-index: 14;
        position: fixed;
        bottom: 0;
        right: 0;
        left: 0;
        top: 0;
    }

    /* transitions */
    .fade-enter-active, .fade-leave-active {
        transition: opacity .3s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
    /* transitions */
    .fast-fade-enter-active, .fast-fade-leave-active {
        transition: opacity .1s;
    }
    .fast-fade-enter, .fast-fade-leave-to {
        opacity: 0;
    }
</style>
