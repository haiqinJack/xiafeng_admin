<template>
    <div class="login">
        <div class="login-header">
            <img class="logo" src="../../assets/logo.png" />
            <h1 class="title">Welcome to levi Vue admin</h1>
        </div>
        <div class="login-content">
            <div class="login-box">
                <el-button type="text" @click.prevent="loginMethods = Password">
                    密码登录
                </el-button>
                <el-button type="text" @click.prevent="loginMethods = Captcha">
                    短信登录
                </el-button>
                <keep-alive>
                    <component :is="loginMethods"></component>
                </keep-alive>
            </div>
        </div>
    </div>
</template>

<script setup>
import { shallowRef } from "vue";
import Captcha from "./components/Captcha.vue";
import Password from "./components/Password.vue";

const loginMethods = shallowRef(Password);
</script>

<style lang="postcss" scoped>
.login {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    &-header {
        flex: 1;
        display: flex;
        align-items: center;
        padding: 0 6vw;
        .logo {
            margin-right: 2vw;
            height: 2.2vw;
        }
        .title {
            font-weight: normal;
            margin: 0;
            font-size: 3vmin;
            color: #2d2d2d;
        }
    }
    &-content {
        display: flex;
        flex: 8;
        align-items: center;
        justify-content: flex-end;
        background: url("../../assets/bg.jpeg") no-repeat center;
        background-size: 100% 100%;
        .login-box {
            width: 300px;
            background-color: #fff;
            margin-right: 10vw;
            padding: 2vh 1.2vw;
            border-radius: 4px;
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        }
    }
}
</style>
