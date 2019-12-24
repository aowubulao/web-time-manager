<title>登录</title>

<template>
    <div class="login-background">
        <br><br><br><br><br>
        <el-card class="box-card my-align">
            <div slot="header" class="clearfix">
                <div style="text-align: center; margin-top: 10px"><img src="../assets/title.png" width="200px" height="50px"></div>
                <div style="text-align: center; color: gray; letter-spacing: 1px; margin-top: 6px"><p>Let’s set up your account!</p></div>
            </div>
            <div class="text item">
                <!-- 输入框 -->
                <div style="margin: 20px;"></div>
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="50px" class="demo-ruleForm">
                    <el-form-item label="" prop="email">
                        <el-input type="text" v-model="ruleForm.email" autocomplete="off" class="input-width"
                                  placeholder="请输入邮箱" prefix-icon="el-icon-message"/>
                    </el-form-item>
                    <el-form-item label="" prop="password">
                        <el-input type="password" v-model="ruleForm.password" autocomplete="off" class="input-width"
                                  placeholder="请输入密码" prefix-icon="el-icon-lock"/>
                    </el-form-item>
                    <el-form-item label="" prop="checkPass">
                        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" class="input-width"
                                  placeholder="请再次输入密码" prefix-icon="el-icon-lock"/>
                    </el-form-item>
                    <el-form-item label="" prop="checkCode">
                        <el-input type="checkCode" v-model="ruleForm.checkCode" autocomplete="off"
                                  style="width: 120px; margin-right: 40px" placeholder="验证码"
                                  prefix-icon="el-icon-mobile"/>
                        <el-button type="primary" @click="getCheckCode('ruleForm')" :disabled="isDisable" style="background-color: #1890ff">获取</el-button>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')" style="align-content: center; width: 230px; background-color: #1890ff" :loading="isLoading">注 册</el-button>
                    </el-form-item>
                    <div style="text-align: center"><p style="color: #c9d6df">已有账号？<a type="primary" @click="goLogin" style="color: #1890ff">点此登录</a></p></div>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        data() {
            let validateEmail = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入邮箱!'));
                } else {
                    //setTimeout(this.checkPhoneNum(), 1000)
                    this.checkEmailAdd();
                    if (!this.checkEmail) {
                        callback(new Error('邮箱已被使用!'));
                    } else {
                        callback();
                    }
                }
            };
            let validateEmailAdd = (rule, value, callback) => {
                if (value !== '') {
                    //setTimeout(this.checkPhoneNum(), 1000)
                    this.checkEmailAdd();
                    if (!this.checkEmail) {
                        callback(new Error('邮箱已被使用!'));
                    } else {
                        callback();
                    }
                }
            };
            let validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            let validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm: {
                    email: '',
                    password: '',
                    checkPass: '',
                    checkCode: ''
                },
                checkEmail: '',
                isDisable: false,
                isLoading: false,
                rules: {
                    email: [
                        { validator: validateEmail, trigger: 'blur' },
                        { validator: validateEmailAdd, trigger: 'change' },
                        { type: 'email', message: '请输入正确的邮箱地址!', trigger: 'blur' }
                    ],
                    password: [
                        { validator: validatePass, trigger: 'blur' },
                        { min: 6, message: '密码长度应大于6位!', trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.isLoading = true;
                        this.register();
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            getCheckCode(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.sendCheckCode();
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            goLogin: function () {
                this.$router.push('login');
            },
            register: async function () {
                const axios = require('axios');
                let params = new URLSearchParams();
                params.append('email', this.ruleForm.email);
                params.append('password', this.$md5(this.$md5(this.$md5(this.ruleForm.password))));
                params.append('checkCode', this.ruleForm.checkCode);
                let ret = await axios.post("/api/timaner/user/register", params).then(ret => {
                    this.$notify({
                        message: '注册成功！',
                        duration: 2000,
                        type: 'success'
                    });
                    this.$router.push('/');
                }).catch(error => {
                    this.isLoading = false;
                    this.ruleForm.checkCode = '';
                    this.$notify({
                        message: '验证码错误！',
                        duration: 2000,
                        type: 'error'
                    });
                })
            },
            checkEmailAdd: async function() {
                const axios = require('axios');
                var ret = await axios.get("/api/timaner/user/email/" + this.ruleForm.email).then(ret => {
                    this.checkEmail = ret.data;
                }).catch(error => {
                })
            },
            sendCheckCode : async function() {
                this.isDisable = true;
                const axios = require('axios');
                let ret = await axios.get("/api/timaner/email/" + this.ruleForm.email).then(ret => {
                    this.$notify({
                        message: '已发送',
                        duration: 2000,
                        type: 'info'
                    });
                }).catch(error => {
                    this.$notify({
                        message: '发送失败',
                        duration: 2000,
                        type: 'error'
                    });
                })
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
        background-color: #F6F7F8;
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
