<template>
    <table class="table table-sm table-bordered">
        <thead>
            <tr>
                <th
                    scope="col"
                    class="text-center align-middle"
                    v-for="(th, thIdex) in tableThs"
                    :key="thIdex"
                    :colspan="th.colspan"
                    :rowspan="th.rowspan"
                >
                    {{ th.name }}
                </th>
            </tr>
            <tr>
                <th
                    scope="col"
                    class="text-center align-middle"
                    v-for="(th2, thIdex2) in skuLabels"
                    :key="thIdex2"
                    colspan="1"
                    rowspan="1"
                >
                    {{ th2.name }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in list" :key="index">
                <th
                    scope="row"
                    v-for="(sku, skuI) in item.skus"
                    :key="skuI"
                    class="text-center"
                >
                    {{ sku.name }}
                </th>
                <td class="text-center">
                    <span
                        v-if="!item.image"
                        class="btn btn-light border mr-2"
                        @click="chooseImage(item)"
                    >
                        <el-icon size="20"><Plus /></el-icon>
                    </span>
                    <img
                        v-else
                        :src="item.image"
                        style="width: 35px; height: 35px; cursor: pointer"
                        @click="chooseImage(item)"
                        class="rounded"
                    />
                </td>
                <td class="text-center" width="100">
                    <input
                        v-model="item.pprice"
                        type="number"
                        class="form-control text-center"
                        placeholder="规格值"
                    />
                </td>
                <td class="text-center">
                    <input
                        v-model="item.stock"
                        type="number"
                        class="form-control text-center"
                        placeholder="规格值"
                    />
                </td>
                <td class="text-center">
                    <input
                        v-model="item.code"
                        type="text"
                        class="form-control text-center"
                        placeholder="规格值"
                    />
                </td>
            </tr>
        </tbody>
    </table>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import { Plus } from "@element-plus/icons-vue";
export default {
    components: { Plus },
    data() {
        return {
            list: [],
        };
    },
    inject: ["app"],
    computed: {
        ...mapGetters(["tableThs", "skuTree", "skuLabels"]),
        ...mapState({
            sku_card: (state) => state.goods_create.sku_card,
        }),
    },
    watch: {
        skuTree(newValue, oldValue) {
            this.list = newValue;
        },
    },
    methods: {
        // 选择图片
        chooseImage(item) {
            this.app.chooseImage((res) => {
                item.image = res[0].url;
            });
        },
    },
};
</script>
