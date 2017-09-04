import eventSideBar from 'src/client/components/event-sidebar.vue'
import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use( VueRouter )

// build routing table
const routeTable = [
    { path: '/events/:event_id', component: eventSideBar }
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
