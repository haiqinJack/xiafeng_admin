<template>
    <div>
        <!-- <el-scrollbar height="90vh">
            <el-tabs
                :model-value="currentIndex"
                type="card"
                closable
                @tab-click="clickTab"
                @tab-remove="removeTab"
                class="bg-light"
            >
                <el-tab-pane
                    v-for="item in tabsOption"
                    :key="item.route"
                    :closable="item.route !== '/dashboard/workplace'"
                    :label="item.title"
                    :name="item.route"
                >
                    
                </el-tab-pane>
            </el-tabs>
        </el-scrollbar> -->
        <router-view v-if="$route.meta.keepAlive" v-slot="{ Component }">
            <transition name="fade" mode="out-in">
                <component :is="Component" :key="$route.path" />
            </transition>
        </router-view>

        <router-view v-if="!$route.meta.keepAlive" v-slot="{ Component }">
            <transition name="fade" mode="out-in">
                <keep-alive>
                    <component :is="Component" :key="$route.path" />
                </keep-alive>
            </transition>
        </router-view>
        <el-backtop :visibility-height="10">
            <div
                style="
                    height: 100%;
                    width: 100%;
                    background-color: #f2f5f6;
                    box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
                    text-align: center;
                    line-height: 40px;
                    color: #1989fa;
                "
            >
                UP
            </div>
        </el-backtop>
    </div>
</template>
<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();

const tabsOption = computed(() => store.getters["tabModule/getTabsOption"]);
const currentIndex = computed(() => store.getters["tabModule/getCurrentIndex"]);

const removeTab = (tabName) => {
    if (tabName === "/dashboard/workplace") {
        return;
    }
    store.commit("tabModule/DELETE_TAB", tabName);
    if (currentIndex.value === tabName) {
        if (tabsOption.value && tabsOption.value.length) {
            store.commit(
                "tabModule/SET_TAB",
                tabsOption.value[tabsOption.value.length - 1].route
            );
            router.replace({ path: currentIndex.value });
        } else {
            router.replace({ path: "/" });
        }
    }
};

const clickTab = (tabName) => {
    // eslint-disable-next-line no-console
    store.commit("tabModule/SET_TAB", tabName.paneName);
    router.replace({ path: currentIndex.value });
};
</script>
