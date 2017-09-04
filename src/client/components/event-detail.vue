<template>
    <div class="event-detail-module">
        <div class="meta">
            <h2 class="title">{{ event.title }}</h2>
            <div class="evt-date">{{ formattedDate }}</div>
        </div>
        <div class="description">{{ event.description }}</div>

        <div v-if="firstNote.email" class="note-module">
            <div class="meta">
                <h4>Additional info:</h4>
                <button class="edit" @click="$store.commit('INITIALIZE_EVENT_EDIT', event_id)">Edit</button>
            </div>
            <div class="divider-sm"></div>
            <div class="meta">
                <div class="email">Last Updated By: {{ firstNote.email }}</div>
                <div class="note-date">{{ formattedNoteDate }}</div>
            </div>
            <div class="note-body" v-html="noteMarkdown"></div>
        </div>
    </div>
</template>

<script>
    import marked from 'marked'
    import moment from 'moment'

    export default {
        computed: {
            event_id () {
                return _.get(this.$route, 'params.event_id')
            },
            event () {
                return this.$store.state.events[ this.event_id ] || {}
            },
            notes () {
                return this.$store.state.notes[ this.event_id ] || []
            },
            firstNote () {
                return _.first(this.notes) || {}
            },
            noteMarkdown () {
                return this.editing ? marked(this.editing.body) : marked(this.firstNote.body || '')
            },
            editing () {
                return this.$store.state.editing[ this.event_id ]
            },
            formattedDate () {
                return moment(this.event.date).format('MMMM Do, YYYY')
            },
            formattedNoteDate () {
                return moment(this.firstNote.created_at).format('MMMM Do, YYYY')
            }
        }
    }
</script>

<style scoped>
    .event-detail-module {
        padding: 45px 60px;
    }
    .divider-sm::after {
        background-color: #222;
    }
    .title {
        margin: 0;
    }
    .meta {
        overflow: hidden;
    }
    .meta > *:first-child {
        float: left;
    }
    .meta > *:last-child  {
        float: right;
    }
</style>
