<template>
    <div @touchmove.prevent @mousewheel.prevent>
        <div class="div1">
            <p style="font-size: 80px; font-weight: 300;" @click="transDay">{{calender.moon}}</p>
            <p style="font-weight: 400;font-size: 20px;">{{calender.sun}}  {{calender.date}}  {{calender.festival}}</p><br>
            <p class="words-style">{{calender.words}}</p><br>
            <div class="div2" >
                <hr width="40px" color="#A9B4AC"><br>
                <p>{{calender.author}}</p>
            </div>
        </div>
        <div v-if="screenWidth > 1200">
            <img src="../../assets/img/pc/pc-2.jpg" class="img-style">
        </div>
        <div v-else>
            <img :src="imgSrc" class="img-style">
        </div>
    </div>

</template>

<script>
    let index;
    export default {
        data() {
            return {
                show3: true,
                screenWidth: '',
                day: '',
                imgSrc: '',
                calender: {
                    sun: '',
                    date: '',
                    moon: '',
                    words: '',
                    author: '',
                    festival: '',
                    index: '',
                    url: ''
                }
            }
        },
        methods: {
            setIndex () {
                let date = new Date();
                let year = date.getFullYear();
                let month = date.getMonth() + 1;
                if (month < 10) month = '0' + month;
                let day = date.getDate();
                if (day < 10) day = '0' + day;
                this.calender.index = year + '' + month + '' + day;
                this.day = day;
            },
            async getCalender() {
                let axios = require('axios');
                let ret = await axios.get("/api/item/calender/" + this.calender.index).then(ret => {
                    if (ret.status === 200) {
                        this.imgSrc = '/img/timaner/' + this.calender.index + '.jpg';
                        index = this.calender.index;
                        this.calender = ret.data;
                        this.calender.index = index;
                    }
                }).catch(error => {
                });
            },
            transDay () {
                if (this.calender.index > '20191202') {
                    this.calender.index -= 1;
                    this.getCalender();
                }
            }
        },
        created () {
            this.show3 = true;
        },
        mounted() {
            this.screenWidth = screen.availWidth;
            let uid = this.$cookie.get('cookie-uid');
            if (uid === null) {
                this.$router.push('/');
            }
            this.show3 = true;
            this.setIndex();
            this.getCalender();
        }
    }
</script>

<style>
    html {
        -ms-overflow-style:none;
        overflow:-moz-scrollbars-none;
    }
    html::-webkit-scrollbar{
        width:0px
    }

    .img-style {
        width: 100%;
        text-align: center;
        margin-bottom: 100px;
    }

    .div1 {
        margin-left: 20px;
        color: white;
        margin-top: 200px;
        height: 400px;
        width: 320px;
        position: absolute;
        z-index: 9999;
    }
    .words-style {
        line-height: 40px;
        font-weight: 200;
        letter-spacing: 1px;
        font-size: 25px;
    }
    .div2 {
        letter-spacing: 3px;
        color: #bbbbbb;
    }

</style>