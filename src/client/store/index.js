import { getEvent } from '../utils'
import Vuex from 'vuex'
// import _ from 'lodash'
import Vue from 'vue'
import 'whatwg-fetch'

// add vuex
Vue.use( Vuex )

export default new Vuex.Store({
    state: {
        screenOn: false,
        events: {}
    },
    mutations: {
        'INITIALIZE_SCREEN': (state) => {
            state.screenOn = true
            return state
        },
        'REMOVE_SCREEN': (state) => {
            state.screenOn = false
            return state
        },
        'SET_EVENT': (state, evt) => {
            state.events[evt.foreign_id] = evt
            return state
        }
    },
    actions: {
        'GET_EVENT': async (context, id) => {
            // load event data from server
            const evt = await getEvent(id)
            context.commit('SET_EVENT', evt)
            return evt
        }
    }
})
