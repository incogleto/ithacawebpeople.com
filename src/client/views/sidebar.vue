<template>
    <div :class="['event-sidebar-module', { editing }]">
        <router-link to="/" class="close" v-html="xSVG"></router-link>
        <div class="content">
            <transition name="fade" mode="out-in">
                <div
                    v-if="$store.state.sidebarMessage"
                    class="sidebar-message"
                    v-html="$store.state.sidebarMessage">
                </div>
                <event-detail v-else></event-detail>
            </transition>
        </div>
        <div class="tray">
            <event-form></event-form>
        </div>
    </div>
</template>

<script>
    import eventDetail from '../components/event-detail.vue'
    import eventForm from '../components/event-form.vue'
    import xIcon from '../icons/x.svg'
    import _ from 'lodash'

    export default {
        name: 'sidebar',
        components: {
            'event-detail': eventDetail,
            'event-form': eventForm
        },
        computed: {
            editing () { return this.$store.state.editing_event_note },
            xSVG () {
                return xIcon
            }
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
        color: #39393b;
        z-index: 15;
        width: 50vw;
        flex-direction: column;
        display: flex;
        bottom: 0;
        right: 0;
        top: 0;
    }
    .event-sidebar-module .content {
        -webkit-overflow-scrolling: touch;
        overflow: auto;
        flex: 1 1 auto;
    }
    .event-sidebar-module .sidebar-message {
        padding: 60px;
    }
    .event-sidebar-module .content .inner {
        padding: 45px 60px;
        overflow: hidden;
    }

    .close {
        position: absolute;
        line-height: 10px;
        cursor: pointer;
        display: block;
        padding: 30px 25px;
        height: 10px;
        width: 10px;
        left: 0;
        top: 0;
    }
    .close:hover svg * {
        fill: #222222;
    }

    .event-sidebar-module .tray {
        border-top: 1px solid rgba(0, 0, 0, 0.1);
        overflow: hidden;
        flex: 0 0 auto;
    }
</style>
