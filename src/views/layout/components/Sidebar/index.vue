<template>
    <el-scrollbar max-height="100vh">
        <el-menu
            router
            class="el-menu-vertical"
            :collapse="isCollapse"
            :default-active="currentIndex"
            text-color="#fff"
            background-color="#545c64"
        >
            <sidebar-item
                v-for="route in routes"
                :item="route"
                :base-path="route.path"
            />
        </el-menu>
    </el-scrollbar>
</template>
<script setup>
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import SidebarItem from "./SidebarItem.vue";
const store = useStore();
const route = useRoute();

onMounted(() => {
    const routePath = route.path;
    store.commit("tabModule/SET_TAB", routePath);
});
const isCollapse = computed(() => !store.getters["appModule/getSidebarState"]);
const routes = computed(() => store.state.permissionModule.accessRoutes);
//默认展开当前路由的菜单
const currentIndex = computed(() => store.getters["tabModule/getCurrentIndex"]);
</script>
<style lang="postcss" scoped>
.el-menu-vertical:not(.el-menu--collapse) {
    width: 200px;
    min-height: 100vh;
}
.el-menu--collapse {
    min-height: 100vh;
}
</style>
