import { getEvent, getNotes, getSelf } from '../api'
import marked from 'marked'
import Vuex from 'vuex'
import _ from 'lodash'
import Vue from 'vue'

// add vuex
Vue.use( Vuex )

export default new Vuex.Store({
    state: {
        user: null,
        screenOn: false,
        events: {},
        notes: {},
        editing_event_note: false,
        searching: false,
        search_results: [],
        sidebarMessage: '',
        breakpoint: ''
    },
    mutations: {
        'SET_USER': (state, user) => {
            if ( user ) return state.user = user
            return state.user = null
        },
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
            state.editing_event_note = {
                event_id: event_id,
                email: _.get(state, 'user.email') || '',
                body: _.get(state, `notes[${ event_id }][0].body`) || ''
            }
            return state
        },
        'TEARDOWN_EVENT_EDIT': (state) => {
            state.editing_event_note = false
            return state
        },
        'EDIT_EVENT_BODY': (state, body) => {
            state.editing_event_note = {
                ...state.editing_event_note,
                body
            }
            return state
        },
        'EDIT_EVENT_EMAIL': (state, email) => {
            state.editing_event_note = {
                ...state.editing_event_note,
                email
            }
            return state
        },
        'INIT_SEARCH': (state) => {
            state.searching = true
            return state
        },
        'DESTROY_SEARCH': (state) => {
            state.searching = false
            return state
        },
        'SET_SEARCH_RESULTS': (state, results) => {
            state.search_results = results
            return state
        },
        'SET_SIDE_MESSAGE': (state, message) => {
            if ( message ) state.sidebarMessage = marked(message)
            else state.sidebarMessage = ''
            return state
        },
        'SET_BREAKPOINT': (state, breakpoint) => {
            if ( breakpoint ) state.breakpoint = breakpoint
            else state.breakpoint = 'desktop'
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
        },
        'FETCH_USER': async (context) => {
            const self = await getSelf()
            context.commit('SET_USER', self)
            return self
        }
    }
})
