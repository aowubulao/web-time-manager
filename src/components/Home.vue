<template>
    <div>
        <div>
            <el-menu :default-active="activeIndex"
                   class="el-menu-demo"
                    style="height: 60px"
                   text-color="#52616b"
                   active-text-color="#1890ff"
                   mode="horizontal" @select="handleSelect">
                <el-menu-item index="1" class="top-width"><i class="el-icon-house"/>首页</el-menu-item>
                <el-menu-item index="2" class="top-width"><i class="el-icon-time"/>日程</el-menu-item>
                <el-menu-item index="3" class="top-width"><i class="el-icon-user"/>个人中心</el-menu-item>
            </el-menu>
        </div>
        <div>
            <router-view/>
        </div>
    </div>
</template>


<script>
    export default {
        data() {
            return {
                show3: true,
                activeIndex: '1',
                navBarFixed: true,
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                if (key === '1') {
                    this.$router.push('/home/index');
                }
                if (key === '2') {
                    this.$router.push('/home/schedule');
                }
                if (key === '3') {
                    this.$router.push('/home/user');
                }
            }
        },
        created() {

        },
        mounted() {
            if (this.$route.path === '/home/index') {
                this.activeIndex = '1';
            }
            if (this.$route.path === '/home/schedule') {
                this.activeIndex = '2';
            }
            if (this.$route.path === '/home/user') {
                this.activeIndex = '3';
            }
            //cookie
            let uid = this.$cookie.get('cookie-uid');
            if (uid === null) {
                this.$router.push('/');
            }
        }
    }
</script>

<style>
    .top-width {
        width: 33.33%;
        text-align: center;
        font-size: 15px;
        letter-spacing: 1px;
        font-weight: 600;
    }
</style>