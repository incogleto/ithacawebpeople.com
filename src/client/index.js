import appSettings from './app.vue'
import Vue from 'vue'

import meetupListCMP from 'src/client/components/meetup-list.vue'
import eventItemCMP from 'src/client/components/event-item.vue'

// register global components
Vue.component('meetup-list', meetupListCMP)
Vue.component('event-item', eventItemCMP)

const app = new Vue(appSettings)

export default app
