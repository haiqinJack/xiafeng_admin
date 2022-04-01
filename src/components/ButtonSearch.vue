<template>
    <div>
        <div class="d-flex align-items-center">
            <!-- 左边 -->
            <slot name="left"> </slot>
            <!-- 右边 -->
            <div class="ml-auto" v-show="!superSearch">
                <slot name="right">
                    <el-input
                        v-model="keyword"
                        :placeholder="placeholder"
                        style="width: 150px"
                        class="mr-2"
                    ></el-input>
                    <el-button
                        v-model="keyword"
                        type="info"
                        @click="$emit('search', keyword)"
                    >
                        搜索
                    </el-button>
                    <el-button v-model="keyword" @click="superSearch = true">
                        高级搜索
                    </el-button>
                </slot>
            </div>
        </div>
        <div class="container">
            <div class="card bg-light my-3" v-show="superSearch">
                <div class="card-header">
                    <span>高级搜索</span>
                    <el-button
                        style="float: right; padding: 0 0"
                        type="text"
                        @click="closeSuperSearch"
                        >收起</el-button
                    >
                </div>
                <div class="card-body">
                    <slot name="form"></slot>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        placeholder: { type: String, default: "" },
    },
    emits: ["search"],
    data() {
        return {
            keyword: "",
            superSearch: false,
        };
    },
    methods: {
        closeSuperSearch() {
            this.superSearch = false;
        },
    },
};
</script>
