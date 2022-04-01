<template>
    <div>
        <el-form ref="ruleFormRef" :model="loginForm" :rules="loginRules">
            <el-form-item prop="username">
                <el-input
                    v-model="loginForm.username"
                    placeholder="用户名/手机号/Jack"
                    clearable
                >
                    <template #prefix>
                        <i class="el-input__icon el-icon-user"></i>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input
                    v-model="loginForm.password"
                    type="password"
                    placeholder="密码/450450"
                >
                    <template #prefix>
                        <i class="el-input__icon el-icon-key"></i>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button
                    class="button"
                    type="danger"
                    @click="submitForm(ruleFormRef)"
                >
                    登录
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script setup>
import { reactive, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const ruleFormRef = ref();
const router = useRouter();
const store = useStore();

function validUsername(str) {
    const valid_map = ["admin", "editor", "Jack"];
    return valid_map.indexOf(str.trim()) >= 0;
}

const loginForm = reactive({
    username: "",
    password: "",
});

const validateUsername = (rule, value, callback) => {
    if (!validUsername(value)) {
        callback(new Error("请输入正确的用户名"));
    } else {
        callback();
    }
};
const validatePassword = (rule, value, callback) => {
    if (value.length <= 5) {
        callback(new Error("The password can not be less than 6 digits"));
    } else {
        callback();
    }
};

const loginRules = {
    username: [
        { required: true, trigger: "blur", validator: validateUsername },
    ],
    password: [
        { required: true, trigger: "blur", validator: validatePassword },
    ],
};

const submitForm = (formEl) => {
    if (!formEl) return;
    formEl.validate((valid) => {
        if (valid) {
            // console.log(store.state.user.name, ': store.state.user.name')
            // store.commit('user/setName', 'Jack')
            // console.log(store.getters['user/getName'], ': store.commit')
            store
                .dispatch("user/loginByUsername", loginForm)
                .then(() => {
                    console.log("add");
                    router.push({ path: "/" });
                })
                .catch((e) => {});
        } else {
            return false;
        }
    });
};
</script>
<style lang="postcss" scoped>
.button {
    width: 100%;
}
</style>
