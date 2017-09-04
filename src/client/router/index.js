import sidebarCMP from 'src/client/components/sidebar.vue'
import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use( VueRouter )

// build routing table
const routeTable = [
    { path: '/events/:event_id', component: sidebarCMP }
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
