<template>
    <div :class="['event-sidebar-module', { editing }]">
        <div class="content">
            <event-detail @edit="editMode"></event-detail>
        </div>
        <div class="tray">
            <form class="markdown-input-module">
                <div class="markdown-input">
                    <textarea name="markdown" @input="changeText">{{ textValue }}</textarea>
                </div>
                <button type="submit">Save</button>
            </form>
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
        computed: {
            event_id () {
                return _.get(this.$route, 'params.event_id')
            },
            editing () {
                return this.$store.state.editing[ this.event_id ]
            },
            textValue () {
                return this.editing && this.editing.body
            }
        },
        methods: {
            editMode (text) {
                this.editing = true
                this.text = text
            },
            changeText (e) {
                this.$store.commit('EDIT_EVENT_BODY', { 
                    event_id: this.event_id,
                    body: e.target.value
                })
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
        transition: all 0.3s;
        border-top: 1px solid transparent;
        overflow: hidden;
        height: 0;
    }
    .event-sidebar-module.editing .tray {
        border-color: rgba(0, 0, 0, 0.1);
        height: 300px;
    }
    .event-sidebar-module .content .inner {
        padding: 45px 60px;
        overflow: hidden;
    }
</style>
