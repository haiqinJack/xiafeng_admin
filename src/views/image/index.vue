<template>
    <div>
        <el-container
            style="position: absolute; top: 0; bottom: 0; left: 0; right: 0"
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
                <el-button
                    type="warning"
                    size="small"
                    @click="unChoose"
                    v-if="chooseList.length"
                    >取消选中</el-button
                >
                <el-button
                    type="danger"
                    size="small"
                    @click="imageDelete({ all: true })"
                    v-if="chooseList.length"
                    >批量删除</el-button
                >
                <el-button
                    type="success"
                    size="small"
                    @click="openAlbumModel(false)"
                    >立即创建</el-button
                >
                <el-button
                    type="warning"
                    size="small"
                    @click="uploadModel = true"
                    >上传图片</el-button
                >
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
                            @delete="albumDel(index)"
                            @edit="openAlbumModel({ item, index })"
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
                                                        :icon="View"
                                                        size="small"
                                                        @click="
                                                            showPreviewModel(
                                                                item
                                                            )
                                                        "
                                                    ></el-button>
                                                    <el-button
                                                        :icon="Edit"
                                                        size="small"
                                                        @click="
                                                            imageEdit(
                                                                item,
                                                                index
                                                            )
                                                        "
                                                    ></el-button>
                                                    <el-button
                                                        :icon="Delete"
                                                        size="small"
                                                        @click="
                                                            imageDelete({
                                                                index,
                                                            })
                                                        "
                                                    ></el-button>
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

        <!-- 修改|创建相册 -->
        <el-dialog v-model="albumModel" :title="albumsModelTitle">
            <el-form ref="form" :model="albumForm">
                <el-form-item label="相册名称">
                    <el-input
                        v-model="albumForm.name"
                        placeholder="请输入相册名称"
                    ></el-input>
                </el-form-item>
                <el-form-item label="相册排序">
                    <el-input-number
                        v-model="albumForm.order"
                        :min="0"
                        :max="10"
                    ></el-input-number>
                </el-form-item>
            </el-form>
            <template #footer>
                <span>
                    <el-button @click="albumModel = false">取消</el-button>
                    <el-button type="primary" @click="confirmAlbumModel">
                        确定
                    </el-button>
                </span>
            </template>
        </el-dialog>

        <!-- 上传图片 -->
        <el-dialog v-model="uploadModel">
            <div class="text-center">
                <el-upload
                    class="upload-demo"
                    drag
                    action="https://jsonplaceholder.typicode.com/posts/"
                    multiple
                >
                    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                    <div class="el-upload__text">
                        Drop file here or <em>click to upload</em>
                    </div>
                    <template #tip>
                        <div class="el-upload__tip">
                            jpg/png files with a size less than 500kb
                        </div>
                    </template>
                </el-upload>
            </div>
        </el-dialog>

        <el-dialog v-model="previewModel" width="65vw" top="5vh">
            <div style="margin: -60px -20px -30px -30px">
                <img class="w-100" :src="previewImageUrl" />
            </div>
        </el-dialog>
    </div>
</template>
<script setup>
import { reactive, ref, onMounted, computed } from "vue";
import Sidebar from "@/components/image/Sidebar.vue";
import { ElMessageBox, ElMessage } from "element-plus";
import { UploadFilled, Edit, Delete, View } from "@element-plus/icons-vue";

onMounted(() => _init());

const searchForm = reactive({
    order: "shanghai",
    keyword: "",
});
const albums = ref([]);
const albumsIndex = ref(0);
const albumModel = ref(false);
const albumEditIndex = ref(-1); //如果等于-1, 说明是创建，否则就是修改albums的index
const albumForm = reactive({
    name: "",
    order: 0,
});

const albumsModelTitle = computed(() => {
    return albumEditIndex.value > -1 ? "修改相册" : "创建相册";
});

const uploadModel = ref(false);
const previewModel = ref(false);
const previewImageUrl = ref("");

const images = ref([
    {
        url: "https://tangzhe123-com.oss-cn-shenzhen.aliyuncs.com/Appstatic/qsbk/demo/datapic/40.jpg",
        name: "图片",
        order: 0,
        ischeck: false,
        checkOrder: 0,
    },
]);

const chooseList = ref([]);

const currentPage = ref(5);
const pageSize = ref(100);
const background = ref(false);
const disabled = ref(false);
async function _init() {
    for (let i = 0; i < 20; i++) {
        albums.value.push({
            id: i,
            name: `相册${i}`,
            num: Math.floor(Math.random() * 100),
            order: 0,
        });
    }

    for (let i = 0; i < 30; i++) {
        images.value.push({
            id: i,
            url: "https://tangzhe123-com.oss-cn-shenzhen.aliyuncs.com/Appstatic/qsbk/demo/datapic/40.jpg",
            name: `图片${i}`,
            order: 0,
            ischeck: false,
            checkOrder: 0,
        });
    }
}
const handleSizeChange = (val) => {
    console.log(`${val} items per page`);
};
const handleCurrentChange = (val) => {
    console.log(`current page: ${val}`);
};
function unChoose() {
    images.value.forEach((img) => {
        //找到所有选中的图片
        let i = chooseList.value.findIndex((item) => {
            return item.id === img.id;
        });
        if (i > -1) {
            // 取消选中样式，选中排序归零
            img.ischeck = false;
            img.checkOrder = 0;
            // 从chooseList中移除
            chooseList.value.splice(i, 1);
        }
    });
}
function choose(item) {
    if (!item.ischeck) {
        chooseList.value.push({ id: item.id, url: item.url });

        item.checkOrder = chooseList.value.length;
        item.ischeck = true;
        return;
    }
    //取消选中
    //找到chooseList中的索引，删除
    let i = chooseList.value.findIndex((v) => v.id === item.id);
    if (i === -1) return;
    // 重新计算序号
    let length = chooseList.value.length;
    // 取消选中中间部分
    if (i + 1 < length) {
        for (let j = i; j < length; j++) {
            let no = images.value.findIndex(
                (v) => v.id === chooseList.value[j].id
            );
            if (no > -1) {
                images.value[no].checkOrder--;
            }
        }
    }
    // 删除
    chooseList.value.splice(i, 1);

    // 修改状态
    item.ischeck = false;
}
//修改选中相册
function albumsChange(index) {
    console.log(index, "albumsChange");
    albumsIndex.value = index;
}

//显示AlbumModel，obj存在则是修改，否则创建
function openAlbumModel(obj) {
    if (obj) {
        console.log(obj, "obj");
        let { item, index } = obj;
        albumForm.name = item.name;
        albumForm.order = item.order;
        albumEditIndex.value = index;
        albumModel.value = true;
    } else {
        albumForm.name = "";
        albumForm.order = 0;
        albumEditIndex.value = -1;
        albumModel.value = true;
    }
}
//点击确定修改|创建相册
function confirmAlbumModel() {
    if (albumEditIndex.value > -1) {
        albumEdit();
        albumModel.value = false;
    } else {
        albums.value.unshift({
            name: albumForm.name,
            order: albumForm.order,
            num: 0,
        });
        albumModel.value = false;
    }
}
//修改相册
function albumEdit() {
    albums.value[albumEditIndex.value].name = albumForm.name;
    albums.value[albumEditIndex.value].order = albumForm.order;
}
//删除相册
function albumDel(index) {
    ElMessageBox.confirm("是否删除该相册?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
    }).then(() => {
        albums.value.splice(index, 1);
        ElMessage({
            type: "success",
            message: "删除相册成功",
        });
    });
}

//显示图片Model
function showPreviewModel(item) {
    previewImageUrl.value = item.url;
    previewModel.value = true;
}

//修改图片名称
function imageEdit(item, index) {
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
}

function imageDelete(obj) {
    ElMessageBox.confirm(
        obj.all ? "是否删除选择图片" : "是否删除该图片？",
        "提示",
        {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
        }
    ).then(() => {
        if (obj.all) {
            let list = images.value.filter((img) => {
                return !chooseList.value.some((c) => c.id === img.id);
            });
            images.value = list;
            chooseList.value = [];
        } else {
            images.value.splice(obj.index, 1);
        }
        ElMessage({
            type: "success",
            message: "删除成功！",
        });
    });
}
</script>
<style lang="postcss" scoped>
.sum-active {
    color: #67c23a !important;
    background-color: #f0f9eb !important;
    border-color: #c2e7b0 !important;
}
</style>
