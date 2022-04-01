<template>
    <div
        class="border py-2 px-4 rounded mr-2 position-relative d-flex align-items-center"
    >
        <!-- 图片选择 -->
        <div v-if="type != 0">
            <template v-if="type === 2">
                <span
                    v-if="!item.image"
                    class="btn btn-light border mr-2"
                    @click="chooseImage"
                >
                    <el-icon><Plus /></el-icon>
                </span>
                <img
                    v-else
                    :src="item.image"
                    style="width: 35px; height: 35px; cursor: pointer"
                    @click="chooseImage"
                    class="rounded"
                />
            </template>
        </div>
        <input
            v-model="item.name"
            @input="inputChange"
            type="text"
            class="form-control border-0 text-center"
            style="width: 80px; font-size: 15px"
            placeholder="规格值"
        />

        <el-icon
            @click="removeSkuValue({ cardIndex: cardIndex, listIndex: index })"
            :size="16"
            color="red"
            class="position-absolute p-0"
            style="line-height: 1; right: -8px; top: -8px"
            ><circle-close-filled
        /></el-icon>
    </div>
</template>
<script>
import { Plus, CircleCloseFilled } from "@element-plus/icons-vue";
import { mapMutations } from "vuex";
export default {
    components: {
        Plus,
        CircleCloseFilled,
    },
    inject: ["app"],
    props: {
        type: {
            type: Number,
            default: 0,
        },
        cardIndex: Number,
        item: Object,
        index: Number,
    },
    methods: {
        ...mapMutations(["removeSkuValue", "updateSkuValue"]),
        inputChange(e) {
            this.vModelSkuValue("name", e.target.value);
        },
        vModelSkuValue(key, value) {
            this.updateSkuValue({
                cardIndex: this.cardIndex,
                listIndex: this.index,
                key,
                value,
            });
        },
        // 选择图片
        chooseImage() {
            this.app.chooseImage((res) => {
                console.log(res);
                this.vModelSkuValue("image", res[0].url);
            });
        },
    },
};
</script>
