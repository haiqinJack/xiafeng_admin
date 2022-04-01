<template>
    <el-container class="my-container">
        <Sidebar />
        <el-container>
            <el-header>
                <Header />
            </el-header>
            <el-main class="bg-light" style="position: relative">
                <AppMain />
            </el-main>
        </el-container>
    </el-container>
</template>
<script setup>
import Header from "./components/Header/indev.vue";
import Sidebar from "./components/Sidebar/index.vue";
import AppMain from "./components/AppMain/Index.vue";
</script>
<style lang="postcss" scoped>
.my-container {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
}
</style>
