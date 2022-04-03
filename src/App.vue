<template>
    <router-view />
    <imageDialog ref="ImageDialogRef" :max="max" />
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
	data() {
		return {
			max: 3
		}
	},
    provide() {
        return {
            app: this,
			
        };
    },
    methods: {
        /**
		 * @param {Object} cb 回调函数
		 * @param {number} max 最大选择长度
		 */
        chooseImage(cb, max) {
			if(max) {
				this.max = max
			}
            this.$refs.ImageDialogRef.chooseImage(cb);
        },
        // 选择规格
        chooseSkus(cb) {
            this.$refs.SkuDialogRef.chooseSkus(cb);
        },
    },
};
</script>
