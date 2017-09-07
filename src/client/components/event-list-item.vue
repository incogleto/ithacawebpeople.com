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
                return moment(this.event.date).format('MMM — YYYY')
            }
        }
    }
</script>

<style scoped>
    a {
        display: block;
        text-transform: uppercase;
        text-decoration: none;
        letter-spacing: 2px;
        font-size: 12px;
        padding: 10px 0;
    }
    a span {
        display: block;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    .date {
        text-transform: none;
        font-size: 10px;
        color: rgba(255, 255, 255, 0.8);
    }
</style>
