<template>
    <li class="event-list-item">
        <router-link :to="`/events/${ event.foreign_id }/`">
            <span class="title">{{ event.title }}</span>
            <span class="date">{{ formattedDate }}</span>
        </router-link>
    </li>
</template>

<script>
    import moment from 'moment'
    export default {
        name: 'event-list-item',
        props: {
            event: Object
        },
        computed: {
            formattedDate () {
                if (!this.event) return ''
                return moment(this.event.date).format('MM / YY')
            }
        }
    }
</script>

<style scoped>
    .date {
        text-transform: none;
        font-size: 10px;
        color: rgba(255, 255, 255, 0.5);
    }
</style>
