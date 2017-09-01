<template>
    <div class="meetup-list-module">
        <event-item
            v-for="(evt, i) in events"
            v-if="block"
            :key="`event-${i}`"
            :event="evt">
        </event-item>

        <a
            v-for="(evt, i) in events"
            v-if="block"
            href="#">
        </a>
    </div>
</template>

<script>
    export default {
        name: 'meetup-list',
        props: {
            limit: {
                type: Number,
                default: 6
            },
            block: {
                type: Boolean,
                default: true
            },
            before: Number,
            after: Number
        },
        data () {
            return {
                events: []
            }
        },
        async created () {
            const params = _.pick(this, ['limit', 'before'])

            if ( this.after ){
                params.order = 'ASC'
                params.after = this.after
            }

            const qs = _.keys(params).filter(k => params[k]).map(k => `${k}=${params[k]}`).join('&')
            const json = await fetch(`/api/events?${ qs }`).then(r => r.json())
            this.events = json.data || []
        }
    }
</script>

<style scoped>
    .event-item-module {
        margin: 2em auto;
    }
</style>
