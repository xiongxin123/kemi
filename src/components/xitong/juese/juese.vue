<template>
    <div id="juese">
        <div>
            <table>
                <tr>
                    <th colspan="4">
                        <el-button type="primary" @click="pushView({name:'addNewRole'})">新增角色</el-button>
                    </th>
                </tr>
                <tr>
                    <td>角色名称</td>
                    <td>角色描述</td>
                    <td>详情</td>
                    <td>操作</td>
                </tr>
                <tr v-for="(item,index) in accountInfo" :key="index">
                    <td>{{item.roleName}}</td>
                    <td>{{item.roleDesc}}</td>
                    <td></td>
                    <td>
                        <el-button size="medium" type="primary" @click="pushView({name:'addNewRole',params:{addNewInfo:item}})">编辑角色</el-button>
                        <el-button size="medium" type="danger" @click="deleRole(item._id)">删除角色</el-button>
                    </td>
                </tr>
            </table>
        </div>
        <router-view/>
    </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
    data(){
        return {

        }
    },
    computed:{
        ...mapState(['accountInfo'])
    },
    methods:{

        deleRole(id){
            this.post(this.$apis.deleteRole,{_id:id})
            .then(()=>{
                this.$store.dispatch('loadFindAllRoles')
            })
        }
    },
    created(){
        this.$store.dispatch('loadFindAllRoles')

    }
}
</script>
<style lang="scss" scoped>
#juese>div{
    margin: 100px auto;
    width: 50%;
    min-width: 500px;
    padding: 10px;
    box-sizing: border-box;
    border: 1px solid #000
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
