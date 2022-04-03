<template>
    <el-dialog v-model="imageModel" title="图片管理" width="80%" top="5vh">
        <el-container
            style="position: relative; height: 70vh; margin: -30px -20px"
        >
            <el-header class="d-flex align-items-center border-bottom">
                <div class="d-flex mr-auto">
                    <el-select
                        class="mr-2"
                        placeholder="请选择活动区域"
                        size="small"
                        v-model="searchForm.order"
                        style="width: 150px"
                    >
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                    <el-input
                        class="mr-2"
                        size="small"
                        style="width: 150px"
                        v-model="searchForm.keyword"
                        placeholder="请输入相册名称"
                    ></el-input>
                    <el-button type="success" size="small">搜索</el-button>
                </div>
            </el-header>
            <el-container>
                <el-aside
                    width="200px"
                    style="position: absolute; top: 60px; left: 0; bottom: 60px"
                >
                    <ul class="list-group list-group-flush">
                        <sidebar
                            v-for="(item, index) in albums"
                            :key="index"
                            :item="item"
                            :active="albumsIndex === index"
                            @change="albumsChange(index)"
                            :showOptions="false"
                        />
                    </ul>
                </el-aside>
                <el-container>
                    <el-main
                        style="
                            position: absolute;
                            top: 60px;
                            left: 200px;
                            right: 0;
                            bottom: 60px;
                        "
                    >
                        <div>
                            <el-row :gutter="10">
                                <el-col
                                    :span="24"
                                    :lg="4"
                                    :md="6"
                                    :sm="8"
                                    :xs="12"
                                    v-for="(item, index) in images"
                                    :key="index"
                                >
                                    <el-card
                                        class="box-card mb-3 position-relative"
                                        shadow="hover"
                                        :body-style="{ padding: '0' }"
                                        style="cursor: pointer"
                                    >
                                        <div
                                            class="border"
                                            :class="{
                                                ' border-danger': item.ischeck,
                                            }"
                                        >
                                            <span
                                                class="badge badge-danger"
                                                style="
                                                    position: absolute;
                                                    right: 0;
                                                    top: 0;
                                                "
                                                v-if="item.ischeck"
                                                >{{ item.checkOrder }}</span
                                            >
                                            <img
                                                :src="item.url"
                                                class="w-100"
                                                style="height: 100px"
                                                @click="choose(item)"
                                            />
                                            <div
                                                class="w-100 text-white"
                                                style="
                                                    background: rgba(
                                                        0,
                                                        0,
                                                        0,
                                                        0.5
                                                    );
                                                    position: absolute;
                                                    margin-top: -25px;
                                                "
                                            >
                                                {{ item.name }}
                                            </div>
                                            <div class="p-2 text-center">
                                                <el-button-group>
                                                    <el-button
                                                        size="small"
                                                        @click="
                                                            imageEdit(
                                                                item,
                                                                index
                                                            )
                                                        "
                                                    >
                                                        <template #icon>
                                                            <el-icon>
                                                                <Edit />
                                                            </el-icon>
                                                        </template>
                                                    </el-button>
                                                    <el-button
                                                        size="small"
                                                        @click="
                                                            imageDelete(index)
                                                        "
                                                    >
                                                        <template #icon>
                                                            <el-icon>
                                                                <Delete />
                                                            </el-icon>
                                                        </template>
                                                    </el-button>
                                                </el-button-group>
                                            </div>
                                        </div>
                                    </el-card>
                                </el-col>
                            </el-row>
                        </div>
                    </el-main>
                </el-container>
            </el-container>
            <el-footer class="border-top d-flex align-items-center px-0">
                <div
                    style="width: 200px; flex-shrink: 0"
                    class="h-100 d-flex align-items-center justify-content-center border-right"
                >
                    <el-button-group>
                        <el-button type="primary" size="small"
                            >上一页</el-button
                        >
                        <el-button type="primary" size="small"
                            >下一页</el-button
                        >
                    </el-button-group>
                </div>
                <div style="flex: 1" class="px-2">
                    <el-pagination
                        v-model:currentPage="currentPage"
                        v-model:page-size="pageSize"
                        :page-sizes="[100, 200, 300, 400]"
                        :disabled="disabled"
                        :background="background"
                        layout="sizes, prev, pager, next"
                        :total="1000"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                    />
                </div>
            </el-footer>
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
import Sidebar from "@/components/image/Sidebar.vue";
import { Edit, Delete, View } from "@element-plus/icons-vue";

import { ElMessageBox, ElMessage } from "element-plus";
export default {
    components: {
        Sidebar,
        ElMessage,
        ElMessageBox,
        Delete,
        Edit,
        View,
    },
    props: {
        max: {
            type: Number,
            default: 5,
        },
    },
    data() {
        return {
            imageModel: false,
            callback: false,
            searchForm: {
                order: "shanghai",
                keyword: "",
            },
            albums: [],
            albumsIndex: 0,

            previewModel: false,
            previewImageUrl: false,
            images: [
                {
                    id: "1",
                    url: "https://tangzhe123-com.oss-cn-shenzhen.aliyuncs.com/Appstatic/qsbk/demo/datapic/40.jpg",
                    name: "图片",
                    order: 0,
                    ischeck: false,
                },
				{
				    id: "2",
				    url: "https://tangzhe123-com.oss-cn-shenzhen.aliyuncs.com/Appstatic/qsbk/demo/datapic/40.jpg",
				    name: "图片",
				    order: 0,
				    ischeck: false,
				},{
                    id: "11",
                    url: "https://tangzhe123-com.oss-cn-shenzhen.aliyuncs.com/Appstatic/qsbk/demo/datapic/40.jpg",
                    name: "图片",
                    order: 0,
                    ischeck: false,
                },
				{
				    id: "22",
				    url: "https://tangzhe123-com.oss-cn-shenzhen.aliyuncs.com/Appstatic/qsbk/demo/datapic/40.jpg",
				    name: "图片",
				    order: 0,
				    ischeck: false,
				},
				{
				    id: "111",
				    url: "https://tangzhe123-com.oss-cn-shenzhen.aliyuncs.com/Appstatic/qsbk/demo/datapic/40.jpg",
				    name: "图片",
				    order: 0,
				    ischeck: false,
				},
				{
				    id: "222",
				    url: "https://tangzhe123-com.oss-cn-shenzhen.aliyuncs.com/Appstatic/qsbk/demo/datapic/40.jpg",
				    name: "图片",
				    order: 0,
				    ischeck: false,
				},
				{
				    id: "112",
				    url: "https://tangzhe123-com.oss-cn-shenzhen.aliyuncs.com/Appstatic/qsbk/demo/datapic/40.jpg",
				    name: "图片",
				    order: 0,
				    ischeck: false,
				},
				{
				    id: "232",
				    url: "https://tangzhe123-com.oss-cn-shenzhen.aliyuncs.com/Appstatic/qsbk/demo/datapic/40.jpg",
				    name: "图片",
				    order: 0,
				    ischeck: false,
				},
            ],
            chooseList: [],

            currentPage: 5,
            pageSize: 100,
            background: false,
            disabled: false,
        };
    },
    created() {
        this._init();
    },

    methods: {
        _init() {
            for (let i = 0; i < 20; i++) {
                this.albums.push({
                    name: `相册${i}`,
                    num: Math.floor(Math.random() * 100),
                    order: 0,
                });
            }
        },
        albumsChange(index) {
            this.albumsIndex = index;
        },

        choose(item) {
            if (!item.ischeck) {
				console.log(this.max)
                if (this.chooseList.length >= this.max) {
                    return this.$message({
                        message: `最多选择${this.max}张图片`,
                        type: "warning",
                    });
                }
                this.chooseList.push({
                    id: item.id,
                    url: item.url,
                });
                item.checkOrder = this.chooseList.length;
                item.ischeck = true;
                return;
            }
        },
        unChoose() {
            this.images.forEach((img) => {
                //找到所有选中的图片
                let i = this.chooseList.findIndex((item) => {
                    return item.id === img.id;
                });
                if (i > -1) {
                    // 取消选中样式，选中排序归零
                    img.ischeck = false;
                    img.checkOrder = 0;
                    // 从chooseList中移除
                    this.chooseList.splice(i, 1);
                }
            });
        },
        imageEdit(item, index) {
            ElMessageBox.prompt("请输入修改名称", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                inputValue: item.name,
                inputValidator(val) {
                    if (val === "") {
                        return "图片名称不能为空！";
                    }
                },
            }).then(({ value }) => {
                item.name = value;
                ElMessage({
                    type: "success",
                    message: "修改成功!",
                });
            });
        },
        imageDelete(index) {
            this.$confirm("是否确定删除？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                this.images.splice(index, 1);
                ElMessage({
                    type: "success",
                    message: "删除成功！",
                });
            });
        },
        chooseImage(cb, max) {
            this.unChoose();
            this.callback = cb;
            this.imageModel = true;
        },
        confirm() {
            if (typeof this.callback === "function") {
                this.callback(this.chooseList);
            }
            this.hide();
        },

        hide() {
            this.callback = false;
            this.imageModel = false;
        },
        handleSizeChange(val) {
            console.log(`${val} items per page`);
        },
        handleCurrentChange(val) {
            console.log(`current page: ${val}`);
        },
    },
};
</script>
