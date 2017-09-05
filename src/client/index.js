import appSettings from './app.vue'
import Vue from 'vue'

import slideLeftTrans from 'src/client/transitions/slide-left.vue'
import slideUpTrans from 'src/client/transitions/slide-up.vue'
import eventListItemCMP from 'src/client/components/event-list-item.vue'
import eventItemCMP from 'src/client/components/event-item.vue'

Vue.component('trans-slide-left', slideLeftTrans)
Vue.component('transition-slideup', slideUpTrans)

// register global components
Vue.component('event-list-item', eventListItemCMP)
Vue.component('event-item', eventItemCMP)

const app = new Vue(appSettings)

export default app
