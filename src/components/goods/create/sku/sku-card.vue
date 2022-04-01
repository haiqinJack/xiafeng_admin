<template>
    <div class="card mb-3" style="line-height: 1.2">
        <div class="card-header d-flex align-items-center">
            规格项：
            <el-input
                style="width: 200px"
                :model-value="item.name"
                @input="vModelSku(index, 'name', $event)"
            >
                <template #append>
                    <el-button type="primary" :icon="MoreFilled" />
                </template>
            </el-input>
            <el-radio-group
                style="margin-bottom: -10px"
                class="ml-2"
                :model-value="item.type"
                @change="vModelSku(index, 'type', $event)"
            >
                <el-radio :label="0">无</el-radio>
                <el-radio :label="1">颜色</el-radio>
                <el-radio :label="2">图片</el-radio>
            </el-radio-group>
            <!-- 上移 -->
            <el-button
                :icon="Top"
                class="ml-auto"
                :disabled="index === 0"
                @click="sortCard('moveUp', index)"
            ></el-button>
            <!-- 下移 -->
            <el-button
                :icon="Bottom"
                :disabled="total === index + 1"
                @click="sortCard('moveDown', index)"
            ></el-button>
            <el-button type="text" @click="removeSkuCard(index)"
                >删除</el-button
            >
        </div>
        <div class="card-body">
            <!-- 增加规格 -->
            <div class="d-flex align-items-center flex-warp">
                <skuCardChildren
                    v-for="(list, i) in item.list"
                    :type="item.type"
                    :key="i"
                    :cardIndex="index"
                    :item="list"
                    :index="i"
                />
            </div>
            <!-- 增加规格值 -->
            <div class="mt-2">
                <el-button type="text" :icon="Plus" @click="addSkuValue(index)">
                    增加规格值
                </el-button>
            </div>
        </div>
    </div>
</template>
<script>
import skuCardChildren from "./sku-card-children.vue";
import {
    MoreFilled,
    Top,
    Bottom,
    Plus,
    CircleClose,
    CircleCloseFilled,
} from "@element-plus/icons-vue";
import { mapMutations } from "vuex";

export default {
    components: {
        skuCardChildren,
        CircleClose,
        CircleCloseFilled,
        Plus,
    },
    props: {
        item: Object,
        index: Number,
        total: Number,
    },

    setup() {
        return {
            MoreFilled,
            Top,
            Bottom,
            Plus,
        };
    },
    methods: {
        ...mapMutations([
            "removeSkuCard",
            "vModelSkuCard",
            "sortSkuCard",
            "addSkuValue",
        ]),
        vModelSku(index, key, value) {
            this.vModelSkuCard({ index, key, value });
        },
        sortCard(action, index) {
            this.sortSkuCard({ action, index });
        },
    },
};
</script>
