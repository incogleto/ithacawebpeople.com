<template>

    <transition
        name="transition-slide"
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"
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
            afterEnter (el, done) {
                el.style.display = 'flex'
            },
            leave (el, done) {
                Velocity(el, 'slideUp', 300, done)
            }
        }
    }
</script>
