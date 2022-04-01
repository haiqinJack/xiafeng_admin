<template>
    <router-view />
    <imageDialog ref="ImageDialogRef" :max="1" />
    <skuDialog ref="SkuDialogRef" />
</template>

<script>
import imageDialog from "@/components/image/ImageDialog.vue";
import skuDialog from "@/components/skus/sku-dialog.vue";
export default {
    components: {
        imageDialog,
        skuDialog,
    },
    provide() {
        return {
            app: this,
        };
    },
    methods: {
        // 选择图片
        chooseImage(cb) {
            this.$refs.ImageDialogRef.chooseImage(cb);
        },
        // 选择规格
        chooseSkus(cb) {
            this.$refs.SkuDialogRef.chooseSkus(cb);
        },
    },
};
</script>
