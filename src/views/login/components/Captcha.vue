<template>
  <div>
    <el-form
      ref="passwordForm"
      :model="Form"
    > 
      <el-form-item prop="username">
        <el-input v-model="Form.username" placeholder="用户名/手机号" clearable>
          <template #prefix>  
          <i class="el-input__icon el-icon-user"></i>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="Form.password" type="password" placeholder="请输入验证码">
          <template #prefix>  
          <i class="el-input__icon el-icon-key"></i>
          </template>
          <template #suffix>  
          <el-button type="text">获取验证码</el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="button" type="danger" @click="submitForm('ruleForm')">
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
import {reactive,ref} from 'vue';

const refForm = ref('refForm')

const Form = reactive({
  username: '', 
  password: ''
})

</script>
<style lang='postcss' scoped>
.button {
  width: 100%;
}
</style>