<template>
    <div class="past-meetups-module">
        <h3>Past Meetups</h3>
        <div class="divider-sm"></div>
        <ul class="events">
            <event-list-item
                v-for="(evt, i) in events"
                :event="evt"
                :key="`event-item-${ i }`">
            </event-list-item>
        </ul>
    </div>
</template>

<script>
    import { getEvents } from '../utils'
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
        }
    }
</script>

<style>
    .past-meetups-module ul {
        line-height: 1em;
        padding: 0;
    }
    .past-meetups-module .events a {
        display: block;
        text-transform: uppercase;
        text-decoration: none;
        letter-spacing: 2px;
        font-size: 12px;
        padding: 10px 0;
    }
    .past-meetups-module .events a span {
        display: block;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
</style>
