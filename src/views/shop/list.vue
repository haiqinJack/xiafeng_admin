<template>
    <el-tabs v-model="tabIndex" @tab-click="handleClick">
        <el-tab-pane
            v-for="(tab, tabI) in tabbars"
            :key="tabI"
            :label="tab.name"
        >
            <button-search
                ref="refSearch"
                @search="searchEvnet"
                placeholder="要搜索商品名称"
            >
                <template #left>
                    <router-link :to="{ name: 'shop_create' }">
                        <el-button type="primary">新建</el-button>
                    </router-link>
                    <el-button type="success">下架</el-button>
                    <el-button type="success">上架</el-button>
                </template>
                <template #form>
                    <el-form
                        ref="form"
                        :model="form"
                        :inline="true"
                        style="flex-shrink: 0"
                        class="demo-form-inline"
                    >
                        <el-form-item label="商品名称" class="mb-0">
                            <el-input
                                v-model="form.keyword"
                                input-style="width: 160px"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="商品名称" class="mb-0">
                            <el-input
                                v-model="form.keyword"
                                input-style="width: 160px"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="商品名称" class="mb-0">
                            <el-input
                                v-model="form.keyword"
                                input-style="width: 160px"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="商品名称" class="mb-0">
                            <el-input
                                v-model="form.keyword"
                                input-style="width: 160px"
                            ></el-input>
                        </el-form-item>
                        <el-form-item class="mb-0">
                            <el-button type="primary" @click="searchEvnet"
                                >搜索</el-button
                            >
                            <el-button type="primary" @click="closeSearch"
                                >清空筛选</el-button
                            >
                        </el-form-item>
                    </el-form>
                </template>
            </button-search>
            <el-table
                border
                class="mt-3"
                :data="tableData[tabI].list"
                style="width: 100%"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="45" align="center" />
                <el-table-column prop="title" label="商品" width="380px">
                    <template #default="scope">
                        <div class="media">
                            <img
                                style="width: 60px; height: 60px"
                                :src="scope.row.imageUrl"
                                class="mr-3"
                                alt="..."
                            />
                            <div class="media-body">
                                <p class="mt-0">
                                    {{ scope.row.title }}
                                </p>
                                <p class="mb-0">
                                    分类：{{ scope.row.category }}
                                </p>
                                <p class="mb-0">
                                    时间：{{ scope.row.create_time }}
                                </p>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="type" label="商品类型" align="center" />
                <el-table-column
                    prop="sale_count"
                    label="销量"
                    align="center"
                />
                <el-table-column prop="order" label="排序" align="center" />
                <el-table-column prop="status" label="商品状态" align="center">
                    <template #default="scope">
                        <el-button
                            :type="scope.row.status ? 'success' : 'danger'"
                            @click="changeStatus(scope.row)"
                            >{{ scope.row.status ? "上架" : "下架" }}</el-button
                        >
                    </template>
                </el-table-column>
                <el-table-column prop="stock" label="总库存" align="center" />
                <el-table-column prop="pprice" label="价格" align="center" />
                <el-table-column label="操作" align="center" width="150px">
                    <template #default="scope">
                        <el-button-group>
                            <el-button type="primary" plain>修改</el-button>
                            <el-button
                                type="danger"
                                plain
                                @click="deleteItem(scope.$index)"
                            >
                                删除
                            </el-button>
                        </el-button-group>
                    </template>
                </el-table-column>
            </el-table>
        </el-tab-pane>
    </el-tabs>
</template>
<script>
import ButtonSearch from "@/components/ButtonSearch.vue";

export default {
    components: { ButtonSearch },
    data() {
        return {
            tabIndex: 0,
            tabbars: [
                { name: "审核中" },
                { name: "出售中" },
                { name: "已下架" },
                { name: "库存预警" },
                { name: "回收站" },
            ],
            form: {
                keyword: "",
            },
            tableData: [],
            multipleSelection: [],
        };
    },
    created() {
        this.__getData();
    },
    methods: {
        __getData() {
            for (let i = 0; i < this.tabbars.length; i++) {
                this.tableData.push({
                    currentPage: 1,
                    list: [],
                });
                for (let j = 0; j < 20; j++) {
                    this.tableData[i].list.push({
                        id: 1,
                        title: `dota2-${i}-${j}`,
                        imageUrl:
                            "http://static.yoshop.xany6.com/2018071718294208f086786.jpg",
                        create_time: "2016-05-03 18:30:59",
                        category: "手机",
                        type: "普通商品",
                        sale_count: 20,
                        order: 10,
                        status: 1,
                        stock: 200,
                        pprice: 1000,
                        ischeck: 1,
                    });
                }
            }
        },
        //修改上架，下架
        changeStatus(item) {
            item.status = item.status === 1 ? 0 : 1;
        },
        //删除
        deleteItem(index) {
            this.$confirm("删除", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                this.tableData[this.tabIndex].list.splice(index, 1);
            });
        },
        closeSearch() {
            console.log(this.form, "form");
            this.form = {
                keyword: "",
            };
            this.$refs.refSearch[this.tabIndex].closeSuperSearch();
        },
        handleClick(tab, event) {
            console.log(tab, event);
        },
        searchEvnet(e = false) {
            if (typeof e === "string") {
                console.log("简单搜索", e);
                return;
            }
            console.log("高级搜索", e);
        },
        handleSelectionChange(val) {
            multipleSelection = val;
        },
    },
};
</script>
