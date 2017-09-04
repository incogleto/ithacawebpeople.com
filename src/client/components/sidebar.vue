<template>
    <div :class="['event-sidebar-module']">
        <div class="content">
            <event-detail></event-detail>
        </div>
        <div class="tray">

        </div>
    </div>
</template>

<script>
    import eventDetailCMP from './event-detail.vue'
    import _ from 'lodash'

    export default {
        name: 'sidebar',
        components: {
            'event-detail': eventDetailCMP
        },
        created () {
            this.$store.commit('INITIALIZE_SCREEN')
            document.body.style.overflow = 'hidden'
        },
        beforeDestroy () {
            this.$store.commit('REMOVE_SCREEN')
            document.body.style.overflow = 'initial'
        }
    }
</script>

<style>
    .event-sidebar-module {
        box-sizing: border-box;
        background: #ffffff;
        position: fixed;
        color: #222222;
        z-index: 10;
        width: 50vw;
        flex-direction: column;
        display: flex;
        bottom: 0;
        right: 0;
        top: 0;
    }
    .event-sidebar-module .content {
        overflow: auto;
        flex: 1 1 auto;
    }
    .event-sidebar-module .tray {
        height: 400px;
    }
    .event-sidebar-module .content .inner {
        padding: 45px 60px;
        overflow: hidden;
    }
</style>
