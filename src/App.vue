<template>
    <router-view />
    <ImageDialog ref="ImageDialogRef" :max="1" />
</template>

<script>
import ImageDialog from "@/components/image/ImageDialog.vue";
export default {
    components: {
        ImageDialog,
    },
    provide() {
        return {
            app: this,
        };
    },
    methods: {
        chooseImage(cb) {
            this.$refs.ImageDialogRef.chooseImage(cb);
        },
    },
};
</script>
