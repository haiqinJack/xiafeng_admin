<template>
    <el-dialog v-model="skuDialog" title="商品规格选择" width="80%" top="5vh">
        <el-container
            style="position: relative; height: 70vh; margin: -30px -20px"
        >
            <el-container>
                <el-aside
                    width="200px"
                    style="position: absolute; top: 0; left: 0; bottom: 0"
                >
                    <ul class="list-group list-group-flush">
                        <li
                            class="list-group-item list-group-item-action"
                            v-for="(item, index) in skusList"
                            :key="index"
                            :class="skusIndex === index ? ' sum-active' : ''"
                            @click="changeSku(index)"
                        >
                            {{ item.name }}
                        </li>
                    </ul>
                </el-aside>
                <el-container>
                    <el-header
                        style="position: absolute;top:0;left:200px;right:0 height:60px;line-height:60px;"
                        class="border-top border-bottom"
                    >
                        <el-button
                            type="primary"
                            size="small"
                            @click="doChooseAll"
                            >{{ isChooseAll ? "取消选中" : "全选" }}</el-button
                        >
                    </el-header>
                    <el-main
                        style="
                            position: absolute;
                            top: 60px;
                            left: 200px;
                            right: 0;
                            bottom: 0;
                        "
                    >
                        <div class="d-flex flex-wrap">
                            <span
                                v-for="(li, i) in skuItems"
                                :class="li.ischeck ? 'sum-active' : ''"
                                class="border rounded py-1 px-2 m-1"
                                style="cursor: pointer"
                                @click="choose(li)"
                                >{{ li.name }}</span
                            >
                        </div>
                    </el-main>
                </el-container>
            </el-container>
        </el-container>
        <template #footer>
            <span>
                <el-button @click="hide">取消</el-button>
                <el-button type="primary" @click="confirm">确定</el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script>
import { Edit, Delete, View } from "@element-plus/icons-vue";

import { ElMessageBox, ElMessage } from "element-plus";
export default {
    components: {
        ElMessage,
        ElMessageBox,
        Delete,
        Edit,
        View,
    },

    data() {
        return {
            skuDialog: false,
            callback: false,

            chooseList: [],

            skusIndex: 0,
            skusList: [
                {
                    name: "颜色",
                    type: 0,
                    list: [
                        {
                            id: "1",
                            name: "蓝色",
                            image: "",
                            color: "",
                            ischeck: false,
                        },
                        {
                            id: "3",
                            name: "红色",
                            image: "",
                            color: "",
                            ischeck: false,
                        },
                    ],
                },
                {
                    name: "尺寸",
                    type: 0,
                    list: [
                        {
                            id: "2",
                            name: "S",
                            image: "",
                            color: "",
                            ischeck: false,
                        },
                    ],
                },
            ],
        };
    },
    computed: {
        // skusList[i].list
        skuItems() {
            return this.skusList[this.skusIndex].list;
        },
        isChooseAll() {
            return this.skuItems.length === this.chooseList.length;
        },
    },

    methods: {
        chooseSkus(cb) {
            this.callback = cb;
            this.skuDialog = true;
        },
        confirm() {
            if (typeof this.callback === "function") {
                let item = this.skusList[this.skusIndex];
                this.callback({
                    name: item.name,
                    type: item.type,
                    list: this.chooseList,
                });
            }
            this.hide();
        },

        hide() {
            this.unChooseAll();
            this.callback = false;
            this.skuDialog = false;
        },
        changeSku(index) {
            this.unChooseAll();
            this.skusIndex = index;
        },
        choose(item) {
            // 之前没选中
            if (!item.ischeck) {
                this.chooseList.push(item);
                return (item.ischeck = true);
            }
            // 之前没选中
            let index = this.chooseList.findIndex((v) => v.id === item.id);
            // 找不到
            if (index < 0) return;
            // 找到，选中列表中移除
            this.chooseList.splice(index, 1);
            item.ischeck = false;
        },
        // 选中/取消选中
        doChooseAll() {
            let list = this.skusList[this.skusIndex].list;
            // 已经全选
            if (this.isChooseAll) {
                // 取消全选
                this.unChooseAll();
                return;
            }
            // 全选
            this.chooseList = list.map((v) => {
                // 设置全选状态
                v.ischeck = true;
                return v;
            });
        },
        // 取消选中所有
        unChooseAll() {
            let list = this.skusList[this.skusIndex].list;
            // 取消选中状态
            list.forEach((v) => {
                v.ischeck = false;
            });
            // 清空选中列表
            return (this.chooseList = []);
        },
    },
};
</script>
<style>
.sum-active {
    background-color: rgba(0, 128, 128, 0.192);
    color: #fff;
}
</style>
