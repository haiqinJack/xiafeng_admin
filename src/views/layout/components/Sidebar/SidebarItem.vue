<template>
    <template v-if="!item.meta.hidden">
        <template v-if="hasOneShowingChild(item.children, item)">
            <el-menu-item
                :key="onlyOneChild.path"
                :index="onlyOneChild.path"
                :route="onlyOneChild.path"
            >
                <i :class="onlyOneChild.meta.icon"></i>
                <template #title>{{ onlyOneChild.meta.title }}</template>
            </el-menu-item>
        </template>

        <el-sub-menu
            v-else
            ref="subMenu"
            :index="item.path"
            popper-append-to-body
        >
            <template #title>
                <i :class="item.meta.icon"></i>
                <span>{{ item.meta.title }}</span>
            </template>
            <!--children 进行递归调用自身组件 -->
            <sidebar-item v-for="child in item.children" :item="child" />
        </el-sub-menu>
    </template>
</template>
<script setup>
import { ref } from "vue";

const props = defineProps({
    item: Object,
});

const onlyOneChild = ref();

const hasOneShowingChild = (children = [], parent) => {
    const showingChildren = children.filter((item) => {
        // 如果meta 配置隐藏该路由，则返回false;
        if (item?.meta?.hidden) {
            return false;
        }
        onlyOneChild.value = item;
        return true;
    });
    console.log(showingChildren, "showingChildren");
    if (showingChildren.length === 1) {
        return true;
    }

    // 如果没有孩子，则展示父级路由；
    if (showingChildren.length === 0) {
        onlyOneChild.value = { ...parent, noShowingChildren: true };
        return true;
    }
    return false;
};
</script>
