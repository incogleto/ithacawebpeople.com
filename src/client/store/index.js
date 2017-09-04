import Vuex from 'vuex'
// import _ from 'lodash'
import Vue from 'vue'
import 'whatwg-fetch'

// add vuex
Vue.use( Vuex )

export default new Vuex.Store({
    state: {
        screenOn: false
    },
    mutations: {
        'INITIALIZE_SCREEN': (state) => {
            state.screenOn = true
            return state
        },
        'REMOVE_SCREEN': (state) => {
            state.screenOn = false
            return state
        }
    },
    actions: {}
})
