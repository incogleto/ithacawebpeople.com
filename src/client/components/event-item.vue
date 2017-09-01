<template>
    <div class="event-item-module">

        <h4>{{ event.title }}</h4>
        <div class="description" v-html="description"></div>
        <a :href="event.permalink" class="button">See Details</a>

    </div>
</template>

<script>
    import marked from 'marked'

    export default {
        name: 'event-item',
        props: {
            event: Object
        },
        computed: {
            description () { return marked(this.event.description) }
        }
    }
</script>

<style scoped>
    .event-item-module {
        font-size: 14px;
    }
    h4 {
        text-transform: uppercase;
        letter-spacing: 2px;
    }
    a {
        display: inline-block;
        margin-top: 2em;
        text-decoration: none;
        background: #fff;
        color: #333;
        padding: 7px 45px;
        text-transform: uppercase;
        letter-spacing: 2px;
    }
</style>
