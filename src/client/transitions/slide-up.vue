<template>

    <transition
        name="transition-slide"
        @before-enter="beforeEnter"
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
        methods: {
            beforeEnter (el) {
                el.style.display = 'none'
            },
            enter (el, done) {
                Velocity(el, 'slideDown', 300, done)
            },
            leave (el, done) {
                Velocity(el, 'slideUp', 300, done)
            }
        }
    }
</script>
