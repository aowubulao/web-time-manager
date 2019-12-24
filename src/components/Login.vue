<template>
  <div class="login-background" style="background-color: #F6F7F8">
    <br><br><br><br><br>
    <br><br>
    <el-card class="box-card my-align">
      <div slot="header" class="clearfix">

        <div style="text-align: center; margin-top: 10px"><img src="../assets/title.png" width="200px" height="50px"></div>
        <div style="text-align: center; color: gray; letter-spacing: 1px; margin-top: 6px"><p>Manage your time</p></div>
      </div>
      <div class="text item">
        <!-- 输入框 -->
        <div style="margin: 20px;"></div>

        <el-form :model="user" :rules="rules" ref="ruleForm" label-width="50px" >
          <el-form-item  prop="email">
            <el-input v-model="user.email" placeholder="邮箱" class="input-width" prefix-icon="el-icon-message"
                      style="width: 230px"/>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="user.password" type="password" show-password placeholder="密码" style="width: 230px"
                      prefix-icon="el-icon-lock"/>
          </el-form-item>
          <br>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')" style="align-content: center; width: 230px; background-color: #1890ff" :loading="isLoading">登  录</el-button>
          </el-form-item>
          <div style="text-align: center"><p style="color: #c9d6df">没有账号？<a type="primary" @click="goRegister" style="color: #1890ff">点此注册</a></p></div>
          <div style="text-align: center;margin-top: 8px"><a type="primary" @click="goReset" style="color: #c9d6df">忘记密码</a></div>
        </el-form>

      </div>
    </el-card>
    <br><br>
  </div>
</template>

<script>
  export default {
    data() {
      let validatePhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入邮箱!'));
        } else {
          callback();
        }
      };
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码!'));
        } else {
          callback();
        }
      };
      return {
        user: {
          email: '',
          password: ''
        },
        loginStatus: '',
        loginMessage: '',
        isLoading: false,
        loginUser: {
          id: '',
          username: '',
          password: '',
          email: '',
          notifyNums: ''
        },
        rules: {
          email: [
            { validator: validatePhone, trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址!', trigger: 'blur' }
          ],
          password: [
            { validator: validatePass, trigger: 'blur' },
            { min: 6, message: '请输入正确的密码!', trigger: 'blur' },
          ]
        },
        isLoginSuccess: ''
      };
    },
    methods: {
      submitForm: function (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.isLoading = true;
            this.login();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      login: async function () {
        const axios = require('axios');
        let params = new URLSearchParams();
        params.append('email', this.user.email);
        params.append('password', this.$md5(this.$md5(this.$md5(this.user.password))));
        let ret = await axios.post("/api/timaner/user", params).then(ret => {
          if (ret.status === 200) {
            this.loginUser = ret.data;
            this.loginSuccess();
          }
        }).catch(error => {
          this.loginFail();
        })
      },
      loginSuccess: function() {
        this.$notify({
          message: '登录成功！',
          duration: 2000,
          type: 'success'
        });
        this.setCookie();
        this.$router.push('home');

      },
      loginFail: function () {
        this.isLoading = false;
        this.$notify.error({
          title: '登录失败',
          duration: 2000,
          message: '邮箱或密码错误！'
        });
        this.user.password = '';
      },
      goRegister: function () {
        this.$router.push('register');
      },
      goReset: function () {
        this.$router.push('reset');
      },
      setCookie: function () {
        this.$cookie.set("cookie-uid", this.loginUser.id, 1);
        this.$cookie.set("cookie-email", this.loginUser.email, 1);
      }
    },
    mounted() {
      let uid = this.$cookie.get('cookie-uid');
      if (uid === null) {

      } else {
        this.$router.push('home');
      }
    }
  }
</script>

<style>

  .login-background {
    height: 100%;
    margin: 0;
    padding: 0;
    background-color: #c9d6df;
  }

  .my-align {
    margin-right: auto;
    margin-left: auto;
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 360px;
  }

  .input-width {
    width: 230px;
  }
</style>
