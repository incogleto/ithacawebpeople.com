import appSettings from './app.vue'
import Vue from 'vue'
import 'whatwg-fetch'

import slideLeftTrans from 'src/client/transitions/slide-left.vue'
import slideUpTrans from 'src/client/transitions/slide-up.vue'
import eventListItem from 'src/client/components/event-list-item.vue'
import searchResults from 'src/client/components/search-results.vue'
import eventItem from 'src/client/components/event-item.vue'

Vue.component('trans-slide-left', slideLeftTrans)
Vue.component('transition-slideup', slideUpTrans)

// register global components
Vue.component('event-list-item', eventListItem)
Vue.component('search-results', searchResults)
Vue.component('event-item', eventItem)

const app = new Vue(appSettings)

export default app
