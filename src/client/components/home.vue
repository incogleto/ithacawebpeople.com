<template>
    <main class="home">
        <div class="column"></div>
        <div class="column" v-html="group.description"></div>
        <div class="column">
            <h3><span>Next Meetup</span></h3>
        </div>
        <div class="column">
            <h3><span>Past Meetups</span></h3>
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
        }
    }
</script>

<style>
    main.home {
        flex-wrap: wrap;
        font-size: 20px;
        display: flex;
    }
    .column {
        padding-top: 40px;
        width: 50%;
    }
    .home h3 span {
        position: relative;
    }
    .home h3 span::after {
        position: absolute;
        background-color: rgba(255, 255, 255, 1);
        max-width: 50px;
        height: 1px;
        content: '';
        bottom: -7px;
        right: 0;
        left: 0;
    }
</style>
