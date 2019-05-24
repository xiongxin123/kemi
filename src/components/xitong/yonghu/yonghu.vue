<template>
    <div id="juese">
        <div class="tabdiv">
            <table>
                <tr>
                    <th colspan="4">
                        <el-button type="primary" @click="pushView({name:'addNewUser'})">新增账号</el-button>
                    </th>
                </tr>
                <tr>
                    <td>账号名</td>
                    <td>角色列表</td>
                    <td>操作</td>
                </tr>
                <tr v-for="(item,index) in allUsers" :key="index">
                    <td>{{item.username}}</td>
                    <td>{{item._id}}</td>
                    <td>
                        <el-button size="medium" type="primary" @click="pushView({name:'addNewUser',params:{addNewUser:item}})">编辑</el-button>
                        <el-button size="medium" type="danger" @click="deleUser(item._id)">删除</el-button>
                    </td>
                </tr>
            </table>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
    computed:{
        ...mapState(['allUsers'])
    },
    methods:{
        deleUser(id){
            this.post(this.$apis.deleteUser,{_id:id})
            .then(()=>{
                this.$store.dispatch('loadFindAllUsers')
            })
        },
    },
    created(){
        this.$store.dispatch('loadFindAllUsers')
    }
}
</script>
<style lang="scss" scoped>
.tabdiv{
    margin: 100px auto;
    width: 50%;
    min-width: 500px;
    padding: 10px;
    box-sizing: border-box;
    border: 1px solid #000;
}
table{
    width: 100%;
    tr {
        width: 100%;
        height: 60px;
        text-align: center;
    }
}
</style>