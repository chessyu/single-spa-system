<template>
    <div class="app" v-if="env == 'development'">
        <router-view></router-view>
    </div>

</template>

<script>
export default{
    data(){
        return{
            env:process.env.NODE_ENV
        }
    },
    mounted(){

    }
}
</script>
<style lang="less" scoped>
.app{
    height: 100%;
}
</style>