import appSettings from './app.vue'
import Vue from 'vue'

import eventListItemCMP from 'src/client/components/event-list-item.vue'
import eventItemCMP from 'src/client/components/event-item.vue'

// register global components
Vue.component('event-list-item', eventListItemCMP)
Vue.component('event-item', eventItemCMP)

const app = new Vue(appSettings)

export default app
