<template>
    <ul class="past-meetups-module event-list">
        <event-list-item
            v-for="(evt, i) in events"
            :event="evt"
            :key="`event-item-${ i }`">
        </event-list-item>
    </ul>
</template>

<script>
    import { getEvents } from '../api'
    import moment from 'moment'

    export default {
        name: 'past-meetups',
        data () {
            return { events: [] }
        },
        async created () {
            this.events = await getEvents({
                before: new Date().getTime(),
                limit: 6
            })
            this.$emit('load')
        }
    }
</script>

<style>
    .past-meetups-module {
        line-height: 1em;
        padding: 0;
    }

    ul.event-list {
        list-style-type: none;
    }
    .event-list li {
        transition: all 0.2s;
    }
    .event-list li a {
        position: relative;
    }
    .event-list li a::before {
        transform: translateX(-100%);
        transition: opacity 0.2s;
        opacity: 0;
        content: '→';
        position: absolute;
        top: 0.75em;
        left: -5px;
    }
    .event-list:hover li {
        opacity: 0.5;
    }
    .event-list li:hover a::before {
        opacity: 1;
    }
    .event-list li:hover {
        padding-left: 15px;
        opacity: 1;
    }
</style>
