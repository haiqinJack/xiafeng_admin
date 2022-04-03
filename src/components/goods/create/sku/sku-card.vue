<template>
    <div class="card mb-3" style="line-height: 1.2">
        <div class="card-header d-flex align-items-center">
            规格项：
            <el-input
                style="width: 200px"
                :model-value="item.name"
                @input="vModelSku(index, 'name', $event)"
            >
                <!-- 三个点 -->
                <template #append>
                    <el-button @click="chooseSkus" type="primary">
                        <template #icon>
                            <el-icon>
                                <MoreFilled />
                            </el-icon>
                        </template>
                    </el-button>
                </template>
            </el-input>
            <el-radio-group
                style="margin-bottom: -10px"
                class="ml-2"
                :model-value="item.type"
                @change="vModelSku(index, 'type', $event)"
            >
                <el-radio :label="0">无</el-radio>
                <!-- <el-radio :label="1">颜色</el-radio> -->
                <el-radio :label="2">图片</el-radio>
            </el-radio-group>
            <!-- 上移 -->
            <el-button
                class="ml-auto"
                :disabled="index === 0"
                @click="sortCard('moveUp', index)"
            >
                <template #icon>
                    <el-icon>
                        <Top />
                    </el-icon>
                </template>
            </el-button>
            <!-- 下移 -->
            <el-button
                :disabled="total === index + 1"
                @click="sortCard('moveDown', index)"
            >
                <template #icon>
                    <el-icon>
                        <Bottom />
                    </el-icon>
                </template>
            </el-button>
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
                <el-button type="text" @click="addSkuValue(index)">
                    <template #icon>
                        <el-icon>
                            <Plus />
                        </el-icon>
                    </template>
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
        MoreFilled,
        Top,
        Bottom,
    },
    props: {
        item: Object,
        index: Number,
        total: Number,
    },
    inject: ["app"],
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
        // 选择规格
        chooseSkus() {
            this.app.chooseSkus((res) => {
                let index = this.index;
                let { name, type, list } = res;

                this.vModelSku(index, "name", name);
                this.vModelSku(index, "type", type);
                this.vModelSku(index, "list", list);
            });
        },
    },
};
</script>
