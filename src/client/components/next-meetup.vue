<template>
    <div class="next-meetup-module">
        <h4 class="title">{{ event.title }}</h4>
        <div class="date">{{ formattedDate }}</div>
        <div class="description" v-html="formattedDesc"></div>
        <router-link :to="`/events/${ event.foreign_id }/`">More Information →</router-link>
    </div>
</template>

<script>
    import { getEvents } from '../utils'
    import marked from 'marked'
    import moment from 'moment'
    import _ from 'lodash'
    import Vue from 'vue'

    export default {
        name: 'next-meetup',
        data () {
            return { event: {} }
        },
        computed: {
            formattedDate () {
                return moment(this.event.date).format('MMM Do, YYYY')
            },
            formattedDesc () {
                if ( !this.event.description ) return ''
                const clean = this.event.description.split('\n').join('\n\n')
                return marked(_.truncate(clean, { length: 200 }))
            }
        },
        async created () {
            this.event = await getEvents({
                after: new Date().getTime(),
                order: 'ASC',
                limit: 1
            }).then(_.first)
            this.$emit('load')
        }
    }
</script>

<style scoped>
    .title {
        text-transform: uppercase;
        letter-spacing: 2px;
        line-height: 1.6em;
        font-weight: 300;
        font-size: 18px;
        margin: 0;
    }
    .date {
        font-size: 10px;
        text-transform: uppercase;
        letter-spacing: 2px;
    }
    .description {
        overflow: hidden;
        line-height: 2em;
        font-size: 16px;
    }
</style>
