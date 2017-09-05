<template>
    <ul class="search-results-module event-list">
        <event-list-item
            v-for="(evt, i) in $store.state.search_results"
            :event="evt"
            :key="`search-item-${ i }`">
        </event-list-item>
    </ul>
</template>

<script>
    export default {
        name: 'search-results'
    }
</script>

<style>
    .search-results-module {
        line-height: 1em;
        padding: 0;
    }
</style>
