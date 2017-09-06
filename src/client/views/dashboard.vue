<template>
    <main class="home">
        <div class="row hero" :style="heroStyling">
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
                <div :class="['column', 'past-meetups', { loading: !pastLoaded }]">
                    <h3>Past Meetups</h3>
                    <div class="divider divider-sm"></div>
                    <past-meetups @load="delayLoad('pastLoaded')"></past-meetups>
                </div>
                <div :class="['column', 'next-meetup', { loading: !nextLoaded }]">
                    <h3>Next Meetup</h3>
                    <div class="divider divider-sm"></div>
                    <next-meetup @load="delayLoad('nextLoaded')"></next-meetup>
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
                pastLoaded: false,
                nextLoaded: false
            }
        },
        created () {
            return this.setGroup().catch(err => console.log('Error in home module:', err))
        },
        computed: {
            loading () { return _.isEmpty(this.group) },
            xSVG () { return xIcon },
            heroStyling () {
                const isSearching = this.$store.state.searching
                return isSearching ? {
                    'min-height': 0,
                    'height': 0
                } : { height: '261px' }
            }
        },
        methods: {
            async setGroup () {
                const json = await fetch('/api/groups').then(r => r.json())
                this.group = _.first(json.data)
            },
            delayLoad (key) {
                return setTimeout(() => {
                    this[key] = true
                }, _.random(0, 150))
            }
        }
    }
</script>

<style>
    main.home {
        font-size: 20px;
    }
    .home .hero {
        transition: all 0.3s;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        background-color: #39393b;
        min-height: 261px;
        overflow: hidden;
        line-height: 2em;
    }
    .home .row {
        justify-content: center;
        padding: 0 60px;
        flex-wrap: wrap;
        display: flex;
    }
    .column {
        transition: all 0.3s ease;
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

    .home .column.loading {
        transform: translateY(10px);
        opacity: 0;
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