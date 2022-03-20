<template>
    <router-view />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    name: "App",
    setup() {
        const isCollapse = ref(false);
        const route = {
            path: "/about",
        };
        const handleOpen = (key, keyPath) => {
            console.log(key, keyPath);
        };
        const handleClose = (key, keyPath) => {
            console.log(key, keyPath);
        };
        return {
            isCollapse,
            route,
            handleOpen,
            handleClose,
        };
    },
});
</script>
