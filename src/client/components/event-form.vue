<template>
    <form class="event-form-module" @submit.prevent="handleSubmit">
        <transition-slideup :speed="300" easing="easeOutQuart">
            <div v-if="step == 'email'" class="email-input" @input="changeEmail" key="input">
                <input name="email" placeholder="Email Address" type="email" :value="editing.email">
            </div>
            <div v-else-if="step == 'body'" class="markdown-input" key="textarea">
                <textarea name="markdown" placeholder="" @input="changeBody">{{ bodyValue }}</textarea>
            </div>
        </transition-slideup>
        <button type="submit">{{ btnText }}</button>
    </form>
</template>

<script>
    import { saveNote } from '../api'

    export default {
        name: 'event-form',
        beforeDestroy () {
            this.$store.commit('TEARDOWN_EVENT_EDIT')
        },
        data () {
            return {
                step: 'none'
            }
        },
        computed: {
            btnText () {
                if ( this.step == 'none' ) return 'Edit Info'
                if ( this.step == 'email' ) return 'Set Email'
                if ( this.step == 'body' ) return 'Save Info'
            },
            editing () {
                return this.$store.state.editing_event_note
            },
            bodyValue () {
                return this.editing && this.editing.body
            }
        },
        methods: {
            changeEmail (e) {
                return this.$store.commit('EDIT_EVENT_EMAIL', e.target.value)
            },
            changeBody (e) {
                return this.$store.commit('EDIT_EVENT_BODY', e.target.value)
            },
            async handleSubmit (e) {
                if ( this.step == 'none' ) {
                    this.$store.commit('INITIALIZE_EVENT_EDIT', this.$route.params.event_id)
                    this.step = 'email'
                    return setTimeout(() => {
                        this.$el.querySelector('input[type="email"]').focus()
                    }, 100)
                }
                if ( this.step == 'email' ) {
                    this.step = 'body'
                    return setTimeout(() => {
                        this.$el.querySelector('textarea').focus()
                    }, 100)
                }

                const json = await saveNote(this.editing.event_id, {
                    email: this.editing.email,
                    body: this.editing.body
                })

                console.log(json)
                const body = json.verified ?
                    `### Thanks, your changes have been made.` :
                    `## Thanks! \n\nWe've sent you a confirmation email. <br />Once you've confirmed, your changes will be visible.`.trim()

                this.step = 'none'
                this.$store.commit('SET_SIDE_MESSAGE', body)
                this.$store.dispatch('GET_EVENT_NOTES', this.editing.event_id)
                setTimeout(() => {
                    this.$store.commit('SET_SIDE_MESSAGE')
                    this.$store.commit('TEARDOWN_EVENT_EDIT')
                }, 3 * 1000)
            }
        }
    }
</script>

<style scoped>
    form {
        padding: 10px;
    }
    button {
        display: block;
        width: 100%;
    }
    input {
        vertical-align: top;
        transition: border 0.2s;
        margin: 0;
        border: none;
        text-transform: uppercase;
        -webkit-appearance: none;
        padding: 8px 10px;
        letter-spacing: 2px;
        width: 100%;
        font-size: 10px;
        box-sizing: border-box;
        border: 1px solid rgba(0, 0, 0, 0.1);
    }
    .email-input {
        margin-bottom: 10px;
    }
    .markdown-input {
        position: relative;
        margin-bottom: 10px;
        height: 150px;
    }
    textarea {
        border: 1px solid rgba(0, 0, 0, 0.1);
        -webkit-appearance: none;
        transition: border 0.3s;
        box-sizing: border-box;
        font-size: 14px;
        padding: 10px;
        height: 100%;
        resize: none;
        width: 100%;
    }
    input:focus,
    textarea:focus {
        border-color: rgba(0, 0, 0, 0.25);
    }
</style>
