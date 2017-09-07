<template>
    <div class="header-module">
        <router-link to="/" class="to-home">
            <h2>Ithaca Web People</h2>
        </router-link>
        <div class="menu">
            <div class="items">
                <a href="https://www.meetup.com/ithaca-web-people/" target="_blank" @focus="onFocus" @blur="onBlur">Meetup</a>
                <a href="https://github.com/funkhaus/ithacawebpeople.com" target="_blank" @focus="onFocus" @blur="onBlur">Github</a>
            </div>
            <div class="search-module">
                <input
                    type="text"
                    aria-label="Search"
                    name="s"
                    value=""
                    @focus="initSearch"
                    @blur="checkSearchInput"
                    @input="searchInput">
                <div class="icon" @click="clickMag" v-html="magnifyingSVG"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import magIcon from '~/src/client/icons/magnifying-glass.svg'
    import { searchEvents } from '../utils'
    import _ from 'lodash'

    export default {
        name: 'header-module',
        mounted() {
            window.addEventListener('keyup', evt => {
                if( evt.keyCode === 27 ){
                    this.$store.commit('DESTROY_SEARCH')
                }
            })
        },
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
            searchInput: _.debounce(async function(e){
                const results = await searchEvents(e.target.value)
                this.$store.commit('SET_SEARCH_RESULTS', results)
            }, 100),
            onFocus(){
                this.$el.querySelector('.menu .items').classList.add('active')
            },
            onBlur(){
                this.$el.querySelector('.menu .items').classList.remove('active')
            },
            checkSearchInput(){
                if( ! this.$el.querySelector('.search-module input').value ){
                    this.$store.commit('DESTROY_SEARCH')
                }
            }
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
    .header-module .to-home:hover h2,
    .header-module .to-home:focus h2 {
        letter-spacing: 5px;
    }
    .header-module h2 {
        text-transform: uppercase;
        letter-spacing: 2px;
        font-weight: 400;
        font-size: 18px;
        margin: 0;

        will-change: letter-spacing;
        transition: letter-spacing 0.4s;
    }

    .header-module .menu .items {
        margin-right: 20px;
    }
    .header-module .menu > * {
        display: inline-block;
    }
    .header-module .menu a {
        transition: opacity 0.3s;
        padding: 0 20px;
        font-size: 20px;
    }

    .header-module .menu .items:hover a,
    .header-module .menu .items.active a:not(:focus) {
        opacity: 0.5;
    }
    .header-module .menu .items a:hover {
        opacity: 1;
    }

    .search-module .icon {
        position: relative;
        cursor: pointer;
        top: 5px;
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
    .searching .search-module input,
    .search-module input:focus {
        border-color: #ffffff;
        width: 200px;
    }
</style>
