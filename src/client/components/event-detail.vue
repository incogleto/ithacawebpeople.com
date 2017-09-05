<template>
    <div class="event-detail-module">
        <div class="event-meta">
            <h2 class="title">{{ event.title }}</h2>
            <div class="evt-date">{{ formattedDate }}</div>
        </div>
        <div class="description">{{ event.description }}</div>

        <div class="divider divider-md"></div>

        <div v-if="displayedEmail" class="note-module">
            <div class="version-select">
                <div class="email">Updated By: <strong>{{ displayedEmail }}</strong></div>
                <div class="note-date">{{ formattedNoteDate }}</div>
            </div>
            <div class="note-body markdown" v-html="noteMarkdown"></div>
        </div>
    </div>
</template>

<script>
    import marked from 'marked'
    import moment from 'moment'

    export default {
        data () {
            return {
                focussedNoteIdx: 0
            }
        },
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
            focussedNote () {
                return _.get(this, `notes[${ this.focussedNoteIdx }]`) || {}
            },
            editing () {
                return this.$store.state.editing_event_note
            },
            noteMarkdown () {
                // when editing, text is text from textarea.
                // otherwise use text of most recent note
                const text = this.editing && this.editing.body || this.focussedNote.body

                // format markdown
                return marked(text)
            },
            formattedDate () {
                return moment(this.event.date).format('MMMM Do, YYYY')
            },
            formattedNoteDate () {
                const stamp = this.editing ? new Date().getTime() : this.focussedNote.created_at
                return moment(stamp).format('MM.DD.YYYY')
            },
            displayedEmail () {
                return this.editing && this.editing.email || this.focussedNote.email
            }
        }
    }
</script>

<style>
    .markdown h1 {
        font-size: 28px;
    }
    .markdown h2 {
        font-size: 22px;
    }
    .markdown h3 {
        font-size: 18px;
    }
    .markdown ul {
        list-style-type: initial;
        padding-left: 20px;
    }
    .markdown a {
        color: #39393b;
    }
</style>
<style scoped>
    .event-detail-module {
        padding: 60px;
    }
    .title {
        text-transform: uppercase;
        letter-spacing: 2px;
        line-height: 1.6em;
        font-size: 18px;
        margin: 0;
    }
    .evt-date,
    .email,
    .note-date {
        font-size: 10px;
        text-transform: uppercase;
        letter-spacing: 2px;
    }
    .event-meta {
        margin-bottom: 2em;
    }
    .divider-md {
        margin: 2.5em auto;
    }
    .divider-md::after {
        background-color: rgba(0, 0, 0, 0.1);
        width: 75%;
    }
    .version-select {
        margin: 2.5em auto;
        line-height: 1.4em;
        text-align: center;
    }
    .meta {
        align-items: flex-start;
        overflow: hidden;
        display: flex;
    }
    .meta > *:first-child {
        padding-right: 2em;
        flex: 1 1 auto;
    }
    .meta > *:last-child  {
        flex: 0 0 auto;
    }
    .note-meta {
        align-items: center;
    }
    button.edit {
        padding: 5px 10px;
        font-size: 10px;
    }
</style>
