<template>
    <Hamburger
        :is-active="opened"
        class="hamburger-container"
        @click="toggleSideBar"
    />

    <div class="right-menu">
        <div id="Message">
            <el-dropdown>
                <el-badge
                    :value="messageNum"
                    :max="99"
                    class="message-badge"
                    type="danger"
                >
                    <el-button class="message">
                        <i class="el-icon-message-solid"></i>
                    </el-button>
                </el-badge>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="a"
                            >mike 回复了你的邮件</el-dropdown-item
                        >
                        <el-dropdown-item command="b"
                            >您有5个新任务</el-dropdown-item
                        >
                        <el-dropdown-item command="c"
                            >您已经和Jone成为了好友</el-dropdown-item
                        >
                        <el-dropdown-item command="d"
                            >项目验收通知</el-dropdown-item
                        >
                        <el-dropdown-item command="e" divided
                            >新会议通知</el-dropdown-item
                        >
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
        <el-dropdown class="avatar-container" trigger="hover">
            <div class="avatar-wrapper">
                <el-avatar :src="avatar"></el-avatar>
                <div class="nickname">{{ nickname }}</div>
            </div>
            <template #dropdown>
                <el-dropdown-menu class="user-dropdown">
                    <router-link to="/">
                        <el-dropdown-item>{{
                            langConfig.header.user.homePage
                        }}</el-dropdown-item>
                    </router-link>
                    <router-link to="/personal/personalCenter">
                        <el-dropdown-item>{{
                            langConfig.header.user.personalCenter
                        }}</el-dropdown-item>
                    </router-link>
                    <router-link to="/personal/personalSetting">
                        <el-dropdown-item>{{
                            langConfig.header.user.personalSetting
                        }}</el-dropdown-item>
                    </router-link>
                    <el-dropdown-item divided>
                        <span style="display: block" @click="logout">{{
                            langConfig.header.user.logout
                        }}</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>
<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import Hamburger from "@/components/Hamburger/Hamburger.vue";
const store = useStore();

const messageNum = 5;
const nickname = "Jack";
const langConfig = {
    header: {
        switch: "切换主题色",
        download: "下载主题",
        help: "帮助",
        fullScreen: "全屏预览",
        exitFullScreen: "退出全屏",
        user: {
            homePage: "首页",
            personalCenter: "个人中心",
            personalSetting: "个人设置",
            logout: "退出登录",
        },
    },
};
const opened = computed(() => store.getters["appModule/getSidebarState"]);
const toggleSideBar = () => {
    store.dispatch("appModule/toggleSideBar");
};
const avatar =
    "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg";
</script>
<style lang="postcss" scoped>
.right-menu {
    float: right;
    height: 100%;
    line-height: 60px;
    display: flex;
    &:focus {
        outline: none;
    }

    .message-badge {
        .message {
            border: none;
            padding: 5px 20px;

            i {
                background-color: transparent;
                border: none;
                color: #2c3e50;
                font-size: 25px;
            }
        }
    }

    .full-screen {
        background-color: transparent;
        border: none;
        padding: 5px 20px;

        i {
            background-color: transparent;
            border: none;
            color: #2c3e50;
            font-size: 28px;
        }
    }

    .right-menu-item {
        display: inline-block;
        padding: 0 8px;
        height: 100%;
        font-size: 18px;
        color: #5a5e66;
        vertical-align: text-bottom;

        &.hover-effect {
            cursor: pointer;
            transition: background 0.3s;

            &:hover {
                background: rgba(0, 0, 0, 0.025);
            }
        }
    }

    .avatar-container {
        margin-right: 30px;

        .avatar-wrapper {
            margin-top: 5px;
            position: relative;
            cursor: pointer;

            .user-avatar {
                cursor: pointer;
                width: 40px;
                height: 40px;
                border-radius: 10px;
            }

            .el-icon-caret-bottom {
                cursor: pointer;
                position: absolute;
                right: -20px;
                top: 25px;
                font-size: 12px;
            }
        }
    }
}

.hamburger-container {
    line-height: 60px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;
    &:hover {
        background: rgba(0, 0, 0, 0.025);
    }
}
.nickname {
    float: right;
    padding: 0px 25px 0px 25px;
    line-height: 40px;
    outline: none;
}
</style>
