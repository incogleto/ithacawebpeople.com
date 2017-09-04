import { getEvent, getNotes } from '../utils'
import Vuex from 'vuex'
import _ from 'lodash'
import Vue from 'vue'
import 'whatwg-fetch'

// add vuex
Vue.use( Vuex )

export default new Vuex.Store({
    state: {
        screenOn: false,
        events: {},
        notes: {},
        editing: {}
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
            state.events = {
                ...state.events,
                [evt.foreign_id]: evt
            }
            return state
        },
        'SET_EVENT_NOTES': (state, { event_id, notes }) => {
            state.notes = {
                ...state.notes,
                [event_id]: notes
            }
            return state
        },
        'INITIALIZE_EVENT_EDIT': (state, event_id) => {
            state.editing = {
                ...state.editing,
                [event_id]: {
                    email: '',
                    body: _.get(state, `notes[${ event_id }][0].body`) || ''
                }
            }
            return state
        },
        'EDIT_EVENT_BODY': (state, { event_id, body }) => {
            state.editing = {
                ...state.editing,
                [event_id]: {
                    ...state.editing[event_id],
                    body
                }
            }
            return state
        }
    },
    actions: {
        'GET_EVENT': async (context, id) => {
            // load event data from server
            const evt = await getEvent(id)
            context.commit('SET_EVENT', evt)
            return evt
        },
        'GET_EVENT_NOTES': async (context, event_id) => {
            // load event notes from server
            const notes = await getNotes(event_id)
            context.commit('SET_EVENT_NOTES', { event_id, notes })
            return notes
        }
    }
})
