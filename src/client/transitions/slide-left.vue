<template>
    <transition
        name="transition-slide-left"
        @before-enter="beforeEnter"
        @enter="enter"
        @before-leave="beforeLeave"
        @leave="leave"
        :css="false"
    >
        <slot></slot>
    </transition>
</template>

<script>
    import Velocity from 'velocity-animate'

    export default {
        props: {
            speed: {
                type: Number,
                default: 600
            },
            easing: {
                type: String,
                default: 'easeInOut'
            }
        },
        data () {
            return { rect: {} }
        },
        computed: {
            height () { return this.rect.bottom - this.rect.top },
            width () { return this.rect.right - this.rect.left }
        },
        methods: {
            setRect (el) {
                const dims = el.getBoundingClientRect()
                this.rect = _.pick(dims, ['top', 'left', 'right', 'bottom'])
            },
            beforeEnter (el, done) {
                this.setRect(el)
                return Velocity(el, {
                    clipBottom: this.height,
                    clipRight: this.width,
                    clipLeft: this.width,
                    clipTop: 0
                }, {
                    duration: 0,
                    complete: done
                })
                // el.style.clip = `rect(0, ${ this.width }, ${ this.height }, ${ this.width })`
            },
            enter (el, done) {
                Velocity(el, { clipLeft: 0 }, {
                    duration: this.speed,
                    easing: this.easing,
                    complete: () => {
                        el.style.clip = ''
                        done()
                    }
                })
            },
            beforeLeave (el, done) {
                this.setRect(el)
                return Velocity(el, {
                    clipBottom: this.height,
                    clipRight: this.width,
                    clipLeft: 0,
                    clipTop: 0
                }, {
                    duration: 0,
                    complete: done
                })
            },
            leave (el, done) {
                return Velocity(el, { clipLeft: this.width }, {
                    duration: this.speed,
                    easing: this.easing,
                    complete: () => {
                        el.style.clip = ''
                        done()
                    }
                })
            }
        }
    }
</script>
