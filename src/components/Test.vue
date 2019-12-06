<template>
    <div>
        <button @click="nstart">start</button>
        <button @click="ndone">done</button><br><br>
        <button @click="test1">test1</button>
    </div>

</template>

<script>
    export default {
        methods: {
            nstart () {
                this.$nprogress.start();
            },
            ndone () {
                this.$nprogress.done();
            },
            test1() {
                console.log(new Date().toLocaleDateString().replace('/', '-').replace('/', '-') + ' ' + new Date().getHours() + ':' + new Date().getMinutes());
                console.log(new Date().getHours());
                console.log(new Date().getMinutes());
            }
        }
    }
</script>