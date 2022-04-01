import $Util from "@/utils/sortSku.js";
export default {
    state: {
        sku_type: 0,
        title: "",
        category: [],
        desc: "",
        unit: "",
        min_stock: 0,
        display_stock: 0,
        status: 0,
        express: "",

        code: "", //条码
        stock: 0, //库存
        pprice: 0, //销售价格

        cprice: 0, //成本价格
        weight: 0, //重量

        // 多规格卡片
        sku_card: [
            {
                name: "颜色",
                type: 0,
                list: [
                    // {
                    //     name: "规格值",
                    //     image: "",
                    //     color: "",
                    // },
                ],
            },
        ],

        //规格table
        //表头
        ths: [
            { name: "商品规格", rowspan: 1, colspan: 1, width: "" },
            { name: "sku图片", rowspan: 2, width: "60" },
            { name: "商品价格", rowspan: 2, width: "60" },
            { name: "库存", rowspan: 2, width: "60" },
            { name: "条码", rowspan: 2, width: "60" },
        ],
    },
    getters: {
        // 获取规格项的name :颜色，尺码
        skuLabels(state) {
            return state.sku_card.filter((v) => {
                return v.list.length > 0;
            });
        },
        //表头colspan长度
        tableThs(state, getters) {
            let length = getters.skuLabels.length;
            state.ths[0].colspan = length;
            state.ths[0].rowspan = length > 0 ? 1 : 2;
            return state.ths;
        },
        //获取规格表格数据
        skuTree(state) {
            if (state.sku_card.length === 0) {
                return [];
            }
            let sku_list = [];

            for (let i = 0; i < state.sku_card.length; i++) {
                if (state.sku_card[i].list.length > 0) {
                    sku_list.push(state.sku_card[i].list);
                }
            }
            if (sku_list.length === 0) {
                return [];
            }
            let arr = $Util.cartesianProductOf(...sku_list);
            let res = arr.map((v) => {
                let obj = {
                    skus: [],
                    image: "", //sku图片
                    pprice: 100, //销售价格
                    stock: 10, //库存
                    code: "1255544", //条码
                };
                obj.skus = v;
                return obj;
            });
            console.log(res, "res");
            return res;
        },
    },
    mutations: {
        vModelState(state, { key, value }) {
            state[key] = value;
        },
        // 增加规格卡片
        addSkuCard(state) {
            state.sku_card.push({
                name: "规格名称",
                type: 0,
                list: [],
            });
        },
        // 删除规格卡片
        removeSkuCard(state, index) {
            state.sku_card.splice(index, 1);
        },
        // 修改卡片
        vModelSkuCard(state, { index, key, value }) {
            state.sku_card[index][key] = value;
        },
        // 修改卡片排序
        sortSkuCard(state, { action, index }) {
            $Util[action](state.sku_card, index);
        },
        //增加卡片规格值
        addSkuValue(state, index) {
            state.sku_card[index].list.push({
                name: "规格值",
                image: "",
                color: "",
            });
        },
        //删除指定规格卡片的规格属性
        removeSkuValue(state, { cardIndex, listIndex }) {
            state.sku_card[cardIndex].list.splice(listIndex, 1);
        },
        //修改制定规格卡片的规格属性
        updateSkuValue(state, { cardIndex, listIndex, key, value }) {
            state.sku_card[cardIndex].list[listIndex][key] = value;
        },
    },
    actions: {},
};
