<template>
    <main class="home">
        <div class="row hero">
            <div class="column"></div>
            <div class="column" v-html="group.description"></div>
        </div>
        <div class="row">
            <div class="column next-meetup">
                <h3>Next Meetup</h3>
                <div class="divider-sm"></div>
                <meetup-list :limit="1" :after="new Date().getTime()"></meetup-list>
            </div>
            <div class="column past-meetups">
                <h3>Past Meetups</h3>
                <div class="divider-sm"></div>
                <meetup-list :before="new Date().getTime()"></meetup-list>
            </div>
        </div>
    </main>
</template>

<script>
    import _ from 'lodash'
    import 'whatwg-fetch'

    export default {
        name: 'home',
        data () {
            return { group: {} }
        },
        async created () {
            const json = await fetch('/api/groups').then(r => r.json())
            this.group = _.first(json.data)
        },
        computed: {
            loading () { return _.isEmpty(this.group) }
        }
    }
</script>

<style>
    main.home {
        font-size: 20px;
    }
    .home .hero {
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
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
        padding-right: 50px;
    }
    .home .past-meetups .description,
    .home .past-meetups .button {
        display: none;
    }
    .home .past-meetups h4 {
        font-size: 10px;
    }

    .divider-sm {
        position: relative;
        margin: 1.5em 0;
        height: 1px;
    }
    .divider-sm::after {
        background-color: #ffffff;
        content: '';
        position: absolute;
        width: 50px;
        height: 1px;
        left: 0;
        top: 0;
    }
</style>
