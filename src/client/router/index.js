import VueRouter from 'vue-router'
import Vue from 'vue'

import home from 'src/client/components/home.vue'

Vue.use( VueRouter )

// build routing table
const routeTable = [
    { path: '/', component: home }
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
