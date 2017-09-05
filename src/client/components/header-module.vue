<template>
    <div class="header-module">
        <router-link to="/">
            <h2>Ithaca Web People</h2>
        </router-link>
        <div class="search-module">
            <input
                type="text"
                name="s"
                value=""
                @focus="initSearch"
                @blur="destroySearch"
                @input="searchInput">
            <div class="icon" @click="clickMag" v-html="magnifyingSVG"></div>
        </div>
    </div>
</template>

<script>
    import magIcon from '~/src/client/icons/magnifying-glass.svg'
    import { searchEvents } from '../utils'
    import _ from 'lodash'

    export default {
        name: 'header-module',
        computed: {
            magnifyingSVG () {
                return magIcon
            }
        },
        methods: {
            clickMag () {
                return this.$el && this.$el.querySelector('input').focus()
            },
            initSearch () {
                this.$store.commit('INIT_SEARCH')
            },
            destroySearch () {
                this.$store.commit('DESTROY_SEARCH')
            },
            searchInput: _.debounce(async function(e){
                const results = await searchEvents(e.target.value)
                this.$store.commit('SET_SEARCH_RESULTS', results)
            }, 100)
        }
    }
</script>

<style>
    .header-module {
        background-color: #39393b;
        justify-content: space-between;
        position: fixed;
        padding: 45px 60px;
        display: flex;
        z-index: 10;
        right: 0;
        left: 0;
        top: 0;
    }
    .header-module a {
        text-decoration: none;
    }
    .header-module h2 {
        text-transform: uppercase;
        letter-spacing: 2px;
        font-weight: 400;
        font-size: 18px;
        margin: 0;
    }
    .search-module .icon {
        cursor: pointer;
    }
    .search-module > * {
        display: inline-block;
    }
    .search-module input {
        transition: all 0.3s;
        overflow: hidden;
        width: 0;
        padding-bottom: 5px;
        background: none;
        border: none;
        color: #ffffff;
        border-bottom: 1px solid transparent;
        margin-right: 10px;
    }
    .search-module input:focus {
        border-color: #ffffff;
        width: 200px;
    }
</style>
