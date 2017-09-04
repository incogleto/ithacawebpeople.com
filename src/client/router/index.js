import sidebarCMP from 'src/client/components/sidebar.vue'
import VueRouter from 'vue-router'
import store from '../store'
import Vue from 'vue'

Vue.use( VueRouter )

// build routing table
const routeTable = [
    {
        path: '/events/:event_id',
        component: sidebarCMP,
        beforeEnter (to, from, next) {
            // preload event data with associated notes
            store.dispatch('GET_EVENT_NOTES', to.params.event_id)
            store.dispatch('GET_EVENT', to.params.event_id)
            return next()
        }
    }
]


const router = new VueRouter({
    mode: 'history',
    routes: routeTable
})

// router.beforeEach(( to, from, next ) => {
//     console.log('Before routing.')
//     next()
// })

export default router
