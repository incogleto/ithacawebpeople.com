<template>
    <div :class="['event-sidebar-module']">
        event-sidebar-module
    </div>
</template>

<script>
    import _ from 'lodash'

    export default {
        name: 'sidebar',
        data () {
            return { mounted: false }
        },
        created () {
            this.$store.commit('INITIALIZE_SCREEN')
            document.body.style.overflow = 'hidden'
        },
        beforeDestroy () {
            this.$store.commit('REMOVE_SCREEN')
            document.body.style.overflow = 'initial'
        },
        methods: {
            closeSidebar () {
                this.mounted = false
                setTimeout(() => {
                    this.$router.push('/')
                }, 300)
            }
        },
        computed: {
            event () {
                const eventID = _.get(this.$route, 'params.event_id')
                return _.get(this.$store, `state.events[${ eventID }]`) || {}
            }
        }
    }
</script>

<style>
    .event-sidebar-module {
        background: #ffffff;
        position: fixed;
        z-index: 10;
        width: 50vw;
        bottom: 0;
        right: 0;
        top: 0;
    }
</style>
