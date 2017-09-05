<template>
    <main class="home">
        <div class="row hero">
            <div class="column"></div>
            <div class="column" v-html="group.description"></div>
        </div>
        <div class="row">
            <div class="column">
                <past-meetups></past-meetups>
            </div>
            <div class="column next-meetup">
                <h3>Next Meetup</h3>
                <div class="divider divider-sm"></div>
                <div class="next-meetup-module">

                </div>
            </div>
        </div>
    </main>
</template>

<script>
    import pastMeetupsCMP from './past-meetups.vue'
    import { getEvents } from '../utils'
    import _ from 'lodash'
    import 'whatwg-fetch'

    export default {
        name: 'home',
        components: {
            'past-meetups': pastMeetupsCMP
        },
        data () {
            return {
                group: {},
                nextEvent: {}
            }
        },
        created () {
            return Promise.all([
                this.setGroup(),
                this.setNextEvent()
            ]).catch(err => console.log('Error in home module:', err))
        },
        computed: {
            loading () { return _.isEmpty(this.group) }
        },
        methods: {
            async setGroup () {
                const json = await fetch('/api/groups').then(r => r.json())
                this.group = _.first(json.data)
            },
            async setNextEvent () {
                const evts = await getEvents({
                    after: new Date().getTime(),
                    limit: 1
                })
                this.nextEvent = _.first(evts)
            }
        }
    }
</script>

<style>
    main.home {
        font-size: 20px;
    }
    .home .hero {
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        background-color: #39393b;
        line-height: 2em;
    }
    .home .row {
        padding: 0 60px;
        flex-wrap: wrap;
        display: flex;
    }
    .column {
        padding: 40px 0;
        width: 50%;
    }
    .home .column:nth-child(odd) {
        box-sizing: border-box;
        padding-right: 100px;
    }
    .home .past-meetups .description,
    .home .past-meetups .button {
        display: none;
    }
    .home .past-meetups h4 {
        font-size: 10px;
    }

    .divider {
        position: relative;
        margin: 2em 0;
        height: 1px;
    }
    .divider::after {
        background-color: #ffffff;
        position: absolute;
        content: '';
        margin: auto;
        height: 1px;
        right: 0;
        left: 0;
        top: 0;
    }
    .divider-sm {
        margin: 1.5em 0;
    }
    .divider-sm::after {
        margin: 0;
        width: 50px;
    }
</style>
