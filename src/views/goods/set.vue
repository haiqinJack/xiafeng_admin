<template>
    <div>
        <el-steps :active="active" align-center>
            <el-step title="Step 1" description="设置标题,图片"></el-step>
            <el-step title="Step 2" description="设置规格,价格"></el-step>
            <el-step title="Step 3" description="Some description"></el-step>
        </el-steps>
        <template v-if="active === 1">
            <el-form :model="addForm" label-width="100px" class="addform">
                <el-form-item label="标题">
                    <el-input placeholder="please input title"></el-input>
                </el-form-item>
                <el-form-item label="商品图片">
                    <el-upload
                        action="http://127.0.0.1:7001/upload"
                        list-type="picture-card"
                        auto-upload
                    >
                        <Plus />
                    </el-upload>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleNextStep">
                        下一步
                    </el-button>
                </el-form-item>
            </el-form>
        </template>
        <template v-else-if="active == 2">
            <el-form label-width="100px" class="addform">
                <el-form-item label="设置规格">
                    <el-button type="text" @click="dialogFormVisible = true">
                        添加规格
                    </el-button>
                    <el-dialog v-model="dialogFormVisible" title="添加规格名称">
                        <el-form :model="form">
                            <el-form-item label="规格名称" label-width="120px">
                                <el-input
                                    v-model="form.name"
                                    autocomplete="off"
                                ></el-input>
                            </el-form-item>
                        </el-form>
                        <template #footer>
                            <span class="dialog-footer">
                                <el-button @click="dialogFormVisible = false"
                                    >取消</el-button
                                >
                                <el-button type="primary" @click="addAttribute">
                                    确定
                                </el-button>
                            </span>
                        </template>
                    </el-dialog>
                </el-form-item>
                <el-form-item>
                    <el-card
                        v-for="(item, index) in attribute"
                        :key="index"
                        class="item"
                        shadow="never"
                    >
                        <template #header>
                            <div class="card-header">
                                <span>{{ item.name }}</span>
                                <el-button type="danger" size="small">
                                    <template #default>
                                        <el-icon><Delete /></el-icon>
                                    </template>
                                </el-button>
                            </div>
                        </template>
                        <el-checkbox
                            v-for="(item2, index2) in item.item"
                            :key="index2"
                            v-model="item2.checked"
                            :label="item2.name"
                            size="small"
                        />
                        <el-input
                            v-if="item.canAddAttribute"
                            v-model="item.addAttribute"
                            size="small"
                            placeholder="新增一个规格"
                            class="add-attr"
                            @keyup.enter.native="onAddAttribute(index)"
                        >
                            <template #append>
                                <el-button
                                    size="small"
                                    icon="el-icon-plus"
                                    @click="onAddAttribute(index)"
                                >
                                    添加
                                </el-button>
                            </template>
                        </el-input>
                    </el-card>
                </el-form-item>

                <!-- <el-form-item>
          <Sku />
        </el-form-item> -->
            </el-form>
            <el-form :model="addForm" label-width="100px" class="addform">
                <el-form-item> </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handlePrevStep">
                        上一步
                    </el-button>
                    <el-button type="primary"> 下一步 </el-button>
                </el-form-item>
            </el-form>
        </template>
    </div>
</template>
<script lang="ts" setup>
import Sku from "@/components/Sku/index.vue";
import { Delete } from "@element-plus/icons-vue";
import { ref, reactive, nextTick } from "vue";
import Plus from "@/components/Plus/Plus.vue";
import type { ElInput } from "element-plus";

interface AddForm {
    title: string;
    imageUrl: string;
}
const addForm = reactive<AddForm>({
    title: "",
    imageUrl: "",
});
const title = ref("");
const dialogTableVisible = ref(false);
const dialogFormVisible = ref(false);
const inputValue = ref("");
const dynamicTags = ref(["Tag 1", "Tag 2", "Tag 3"]);
const inputVisible = ref(false);
const InputRef = ref<InstanceType<typeof ElInput>>();
const form = reactive({
    name: "",
});
const attribute = ref([
    {
        name: "颜色",
        item: [
            {
                checked: true,
                name: "黑",
            },
        ],
        canAddAttribute: true,
        addAttribute: "",
    },
]);

const addAttribute = function () {
    console.log(form.name);
    attribute.value.forEach((item) => {
        console.log(item);
        if (item.name == form.name) {
            console.log("重复了");
        } else {
            attribute.value.push({
                name: form.name,
                item: [],
                canAddAttribute: true,
                addAttribute: "",
            });
        }
    });
};
const onAddAttribute = function (index) {};

const handleClose = (tag: string) => {
    dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1);
};

const showInput = () => {
    inputVisible.value = true;
    nextTick(() => {
        InputRef.value.input.focus();
    });
};

const handleInputConfirm = () => {
    if (inputValue.value) {
        dynamicTags.value.push(inputValue.value);
    }
    inputVisible.value = false;
    inputValue.value = "";
};
const objectSpanMethod = ({
    row,
    column,
    rowIndex,
    columnIndex,
}: SpanMethodProps) => {
    if (columnIndex === 0) {
        if (rowIndex % 2 === 0) {
            return {
                rowspan: 2,
                colspan: 1,
            };
        } else {
            return {
                rowspan: 0,
                colspan: 0,
            };
        }
    }
};

const active = ref<number>(2);

const handleNextStep = () => {
    active.value = 2;
};
const handlePrevStep = () => {
    active.value = 1;
};
</script>
<style lang="postcss" scoped>
.addform {
    width: 600px;
}
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

:root {
    --el-color-primary: #409eff;
    --el-color-success: #67c23a;
    --el-color-warning: #e6a23c;
    --el-color-danger: #f56c6c;
    --el-color-error: #f56c6c;
    --el-color-info: #909399;
}
</style>
