<template>
    <main class="home">
        <div class="row hero">
            <div class="column"></div>
            <transition name="fade" appear>
                <div v-if="group.description" class="column" v-html="group.description"></div>
            </transition>
        </div>

        <transition name="fast-fade" mode="out-in">
            <div v-if="$store.state.searching" class="row search-results" key="search-results">
                <div class="column">
                    <h3>
                        <span>Search Results</span>
                        <div class="close-search" @click="$store.commit('DESTROY_SEARCH')" v-html="xSVG"></div>
                    </h3>
                    <div class="divider divider-sm"></div>
                    <search-results></search-results>
                </div>
            </div>
            <div v-else class="row" key="dash">
                <div class="column past-meetups">
                    <h3>Past Meetups</h3>
                    <div class="divider divider-sm"></div>
                    <past-meetups></past-meetups>
                </div>
                <div class="column next-meetup">
                    <h3>Next Meetup</h3>
                    <div class="divider divider-sm"></div>
                    <next-meetup></next-meetup>
                </div>
            </div>
        </transition>
    </main>
</template>

<script>
    import pastMeetups from '../components/past-meetups.vue'
    import nextMeetup from '../components/next-meetup.vue'
    import { getEvents } from '../utils'
    import xIcon from '../icons/x.svg'
    import _ from 'lodash'

    export default {
        name: 'dashboard',
        components: {
            'past-meetups': pastMeetups,
            'next-meetup': nextMeetup
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
            loading () { return _.isEmpty(this.group) },
            xSVG () { return xIcon }
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
        min-height: 261px;
        line-height: 2em;
    }
    .home .row {
        justify-content: center;
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

    .close-search {
        position: relative;
        line-height: 10px;
        cursor: pointer;
        padding: 15px;
        float: right;
        top: -5px;
    }
    .close-search svg * {
        fill: #ffffff;
    }
</style>
