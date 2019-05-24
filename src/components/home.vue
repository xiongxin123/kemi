<template>
    <div id="home">
        <div id="home_top">
            <span style="font-size:30px;color:#fff">可米彩票</span>
            <el-button type="danger" @click="logout">
                <i class="el-icon-warning"></i>注销
            </el-button>
        </div>
        <div id="home_content">
            <div class="navbar">
                <navbar/>
            </div>
            <div class="right">
                <router-view/>
            </div>
        </div>
    </div>
</template>
<script>
import navbar from './navbar'
export default {
    components:{navbar},
    methods:{
        logout(){
            var action = ()=>{
                localStorage.clear();
                this.$router.push({name:'login'});
            }
            this.operatorConfirm('退出',action)
        }
    },
    created(){
        this.$store.dispatch('loadAccountPermissions')
    }
}
</script>
<style lang="scss" scoped>
    #home{
        width: 100%;
        height: 100%;
    }
    #home_top{
        width: 100%;
        height: 10%;
        min-height: 70px;
        background: lightblue;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    #home_content{
        width: 100%;
        height: 90%;
        display: flex
    }
    .navbar{
        width: 20%;
        min-width: 250px;
        height: 100%;
        background:rgb(71, 70, 70);
    }
    .right{
        width: 80%;
        height: 100%;
    }
</style>
