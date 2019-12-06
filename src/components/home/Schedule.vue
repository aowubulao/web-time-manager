<template>
    <div style="background-color: #F6F7F8">
        <el-backtop ></el-backtop>
        <br>
        <div v-loading="loading">
            <div>
                <el-button type="primary" icon="el-icon-plus" style="margin-left: 40px; background-color: #1890ff" @click="scheduleFormVisible = true">添加</el-button>
            </div>
            <br>

            <div class="block" style="margin-left: 10px; margin-right: 10px;" >
                <el-timeline>
                    <el-timeline-item placement="top" color="#409EFF" v-for="item in schedule">
                        <!--<div v-if="watchDateProcess(item.date)"></div>-->
                        <el-card shadow="hover">
                            <el-button type="danger" icon="el-icon-delete" circle style="float: right; margin-right: 3px;" size="mini"
                                       @click="deleteVisible = true, saveSid(item.sid)"></el-button>
                            <!---->
                            <h3 v-text="item.title" style="letter-spacing: 1px"></h3><br><br>
                            <p>提醒时间：{{item.date}}</p>
                        </el-card>
                        <!-- delete -->
                        <el-dialog title="提示" :visible.sync="deleteVisible" width="300px" style="shadow:'never'">
                            <span>确认删除吗</span>
                            <span slot="footer" class="dialog-footer">
                        <el-button @click="deleteVisible = false">取 消</el-button>
                        <el-button type="primary" @click="deleteVisible = false, deleteSelect()" :disabled="isDeleteDisable">确 定</el-button>
                    </span>
                        </el-dialog>
                    </el-timeline-item>
                </el-timeline>
            </div>
        </div>

        <!-- form -->
        <el-dialog title="新增" :visible.sync="scheduleFormVisible" width="310px">
            <el-form :model="submitSchedule" :rules="rules" ref="ruleForm">
                <el-form-item label="主题" prop="title"><br>
                    <el-input v-model="submitSchedule.title" autocomplete="off" style="width: 260px" placeholder="2-10个字符" maxlength="10"></el-input>
                </el-form-item>
                <el-form-item label="提醒时间" prop="date"><br>
                    <el-date-picker style="width: 260px" v-model="submitSchedule.date" type="datetime" :picker-options="pickerOptions"
                                    placeholder="选择日期时间"
                                    format="yyyy-MM-dd HH:mm"></el-date-picker >
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="scheduleFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')" :disabled="isSubmitDisabled">提 交</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    let uid = '';
    let email = '';
    export default {
        data () {
            var validateDate = (rule, value, callback) => {
                if (value <= Date.now() + 9 * 60 * 1000) {
                    callback(new Error('请选择10分钟之后的时间'));
                } else {
                    callback();
                }
            };
            var validateTitle = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入主题!'));
                } else {
                    callback();
                }
            };
            return {
                count: 1,
                uid: '',
                email: '',
                schedule: '',
                scheduleProcess: true,
                timestamp: '进行中',
                scheduleFormVisible: false,
                deleteVisible: false,
                loading: true,
                isSubmitDisabled: false,
                deleteSid: '',
                isDeleteDisable: false,
                submitSchedule: {
                    title: '',
                    date: ''
                },
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() <= Date.now() - 24 * 60 * 60 * 1000
                    }
                },
                rules: {
                    date: [
                        { validator: validateDate, trigger: 'change' }
                    ],
                    title: [
                        { validator: validateTitle, trigger: 'blur' },
                        { min: 2, max: 10, message: '主题在2-10个字之间', trigger: 'blur' }
                    ]
                }
            }
        },
        computed: {
            noMore () {
                return this.count >= 5
            },
            disabled () {
                return this.loading || this.noMore
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.scheduleFormVisible = false;
                        this.setDate();
                        this.addSchedule();
                    } else {
                        this.$notify({
                            message: '请正确填写信息！',
                            duration: 2000,
                            type: 'warning'
                        });
                        this.isSubmitDisabled = true;
                        let that = this;
                        setTimeout(function () {
                            that.isSubmitDisabled = false;
                        }, 3000);
                        return false;
                    }
                });
            },
            noMoreNotify() {
                this.$message({
                    message: '已加载完全部',
                    type: 'success'
                });
            },
            async deleteSelect() {
                this.isDeleteDisable = true;
                let axios = require('axios');
                let ret = await axios.delete("/api/item/schedule/" + this.deleteSid).then(ret => {
                    if (ret.status === 200) {
                        this.getSchedule();
                        this.$notify({
                            message: '删除成功！',
                            duration: 2000,
                            type: 'success'
                        });
                        setTimeout(function () {
                            this.isDeleteDisable = false;
                        }, 2000)
                    }
                }).catch(error => {
                    this.$notify({
                        message: '删除失败！',
                        duration: 2000,
                        type: 'error'
                    });
                });
            },
            saveSid(val) {
                this.deleteSid = val;
            },
            async getSchedule() {
                let axios = require('axios');
                let ret = await axios.get("/api/item/schedule/" + uid).then(ret => {
                    if (ret.status === 200) {
                        this.loading = false;
                        this.schedule = ret.data;
                    }
                }).catch(error => {
                    this.loading = false;
                    this.$notify.info({
                        title: '没有日程！',
                        duration: 2000
                    });
                });
            },
            async addSchedule() {
                let axios = require('axios');
                let params = new URLSearchParams();
                params.append('title', this.submitSchedule.title);
                params.append('date', this.submitSchedule.date);
                params.append('uid', uid);
                let ret = await axios.post("/api/item/schedule/", params).then(ret => {
                    if (ret.status === 200) {
                        this.getSchedule();
                        this.submitSchedule.title = '';
                        this.submitSchedule.date = '';
                        this.$notify({
                            message: '提交成功！',
                            duration: 2000,
                            type: 'success'
                        });
                    }
                }).catch(error => {
                    this.$notify.error({
                        title: '提交失败！',
                        duration: 2000
                    });
                });
            },
            setDate () {
                let date = this.submitSchedule.date;
                let year = date.getFullYear();
                let month = date.getMonth() + 1;
                if (month < 10) month = '0' + month;
                let day = date.getDate();
                if (day < 10) day = '0' + day;
                let hours = date.getHours();
                if (hours < 10) hours = '0' + hours;
                let minutes = date.getMinutes();
                if (minutes < 10) minutes = '0' + minutes;
                this.submitSchedule.date = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes;
            }
        },
        mounted() {
            uid = this.$cookie.get('cookie-uid');
            email = this.$cookie.get('cookie-email');
            if (uid === null) {
                this.$router.push('/');
            }
            this.getSchedule();
        },
        created () {
            this.uid = uid;
            this.email = email;
        }
    }
</script>

<style>

</style>