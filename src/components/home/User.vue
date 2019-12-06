<template>
    <div>
        <div style="text-align: center; margin-top: 30px"><img src="../../assets/title.png" width="200px" height="50px"></div><br><br><br>
        <div style="font-size: 24px;text-align: center;color: black">
            <div>demo测试版</div><br>
            <div style="font-size: 18px">当前用户:{{email}}</div><br>
        </div>


        <div style="text-align: center">
            <el-button type="primary" @click="quitLogin()" style="text-align: center; background-color: #1890ff">退出登录</el-button><br>
        </div>

    </div>
</template>

<script>
    let uid = '';
    let email = '';
    export default {
        data () {
            return {
                email: '',
            }
        },
        methods: {
            quitLogin () {
                this.$cookie.delete('cookie-uid');
                this.$cookie.delete('cookie-email');
                this.$router.push('/');
            }
        },
        mounted() {
            uid = this.$cookie.get('cookie-uid');
            email = this.$cookie.get('cookie-email');
            if (uid === null) {
                this.$router.push('/');
            } else {

            }
        },
        created() {
            let that = this;
            setTimeout(function () {
                that.email = email;
            }, 1);

        }
    }
</script>