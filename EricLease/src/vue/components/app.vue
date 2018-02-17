<template>
    <navbar />
</template>

<script lang="ts">
    import { Vue, Component } from "vue-property-decorator";
    import Navbar from "./navbar.vue";
    
    @Component ({
        components: { Navbar }
    })
    export default class App extends Vue {}
</script>