<template>

    <transition
        name="transition-slide"
        @enter="enter"
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
        methods: {
            enter (el, done) {
                el.style.overflow = 'hidden'
                el.style.height = ''
                const targetHeight = el.clientHeight
                el.style.minHeight = 0
                Velocity(el, {
                    height: [targetHeight, 0]
                }, {
                    duration: this.speed,
                    easing: this.easing,
                    complete: () => {
                        el.style.overflow = ''
                        el.style.height = ''
                        el.style.minHeight = ''
                        return done()
                    }
                })
            },
            leave (el, done) {
                el.style.overflow = 'hidden'
                Velocity(el, {
                    minHeight: 0,
                    height: [0, el.clientHeight],
                    easing: this.easing
                }, {
                    duration: this.speed,
                    complete: () => {
                        el.style.overflow = ''
                        return done()
                    }
                })
            }
        }
    }
</script>
