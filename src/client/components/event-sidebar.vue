<template>
    <div :class="['event-sidebar-module', { mounted }]">
        <div class="overlay" @click="closeSidebar"></div>
        <aside>
            event-sidebar-module
        </aside>
    </div>
</template>

<script>
    export default {
        name: 'event-sidebar',
        data () {
            return { mounted: false }
        },
        mounted () {
            setTimeout(() => {
                this.mounted = true
            }, 10)
        },
        methods: {
            closeSidebar () {
                this.mounted = false
                setTimeout(() => {
                    this.$router.push('/')
                }, 300)
            }
        }
    }
</script>

<style>
    .event-sidebar-module {
        position: fixed;
        z-index: 10;
        bottom: 0;
        right: 0;
        left: 0;
        top: 0;
    }
    .event-sidebar-module .overlay {
        transition: all 0.3s;
        background: rgba(0, 0, 0, 0.5);
        position: absolute;
        height: 100%;
        width: 100%;
        opacity: 0;
        left: 0;
        top: 0;
    }
    .event-sidebar-module aside {
        clip: rect(0, 100vw, 100vh, 100vw);
        transition: all 0.3s ease;
        background: #ffffff;
        position: absolute;
        height: 100%;
        width: 50vw;
        z-index: 5;
        right: 0;
        top: 0;
    }

    .event-sidebar-module.mounted .overlay {
        opacity: 1;
    }
    .event-sidebar-module.mounted aside {
        clip: rect(0, 100vw, 100vh, 0);
    }
</style>
