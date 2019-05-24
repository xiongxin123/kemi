<template>
    <div id="addNewUser">
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="40%"
            :before-close="handleClose">
            
            <el-form :model="addNewUser" status-icon :rules="rules" ref="addNewUser" label-width="80px">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="addNewUser.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="addNewUser.password" type="password"></el-input>
                </el-form-item>
                <el-form-item label="角色" prop="role">
                    <el-input v-model="addNewUser.role"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="addNew">{{isUpdateUser?'更新':'确定'}}</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
    data(){
        return {
            dialogVisible:true,
            isUpdateUser:false,
            addNewUser:{
                username:'',
                password:'',
                role:'',
            },
            rules:{
                username:[
                    {required:true,message:'用户名不能为空',trigger:'blur'},
                    {min:3,max:20,message:'用户名不能小于3和大于10个字符',trigger:'blur'}
                ],
                password:[
                    {required:true,message:'密码不能为空',trigger:'blur'},
                    {min:3,max:20,message:'密码不能小于3和大于10个字符',trigger:'blur'}
                ],
                role:[
                    {required:true,message:'角色名不能为空',trigger:'blur'},
                    {min:3,max:20,message:'角色名不能小于3和大于10个字符',trigger:'blur'}
                ]
            },
        }
    },
    methods:{
        cancel(){
            var action = ()=>{
                this.$router.go(-1)
            }
            this.operatorConfirm('退出编辑',action)
        },
        handleClose(){
            dialogVisible:false;
            this.$router.go(-1);
        },
        addNew(){
            this.$refs['addNewUser'].validate((valid)=>{
                if(valid){
                    var url = "";
                    if(this.isUpdateUser){
                        url = this.$apis.updateUserInfo
                    }else{
                        url = this.$apis.addNewUser
                    }
                    this.post(url,this.addNewUser)
                    .then((resp)=>{
                        this.addNewUser={};
                        this.handleClose();
                        this.$store.dispatch('loadFindAllUsers')
                    })
                }else{
                    return false;
                    this.handleClose();
                }
            })
        }
    },
    // computed:{
    //     ...mapState(['allRoles'])
    // },
    created(){
        if(this.$route.params.addNewUser){
            this.isUpdateUser = true;
            this.addNewUser = this.$route.params.addNewUser
        }else{
            this.isUpdateUser = false;
        }
    }
}
</script>
<style lang="scss" scoped>

</style>
