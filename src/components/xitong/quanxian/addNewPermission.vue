<template>
    <div id="addNewPermission">
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="40%"
            :before-close="handleClose">
            
            <el-form :model="addNewPermission" status-icon :rules="rules" ref="addNewPermission" label-width="80px">
                <el-form-item label="权限名称" prop="permissionName">
                    <el-input v-model="addNewPermission.permissionName"></el-input>
                </el-form-item>
                <el-form-item label="权限描述" prop="permissionDesc">
                    <el-input v-model="addNewPermission.permissionDesc"></el-input>
                </el-form-item>
                <el-form-item label="排列序号" prop="sortNum">
                    <el-input v-model="addNewPermission.sortNum"></el-input>
                </el-form-item>
                <el-form-item label="父级权限" prop="parentid">
                    <el-input v-model="addNewPermission.parentid"></el-input>
                </el-form-item>
                <el-form-item label="权限等级" prop="permissionLeve">
                    <el-input v-model="addNewPermission.permissionLeve"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="addNew">确 定</el-button>
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
            addNewPermission:{
                permissionName:'',
                permissionDesc:'',
                sortNum:'',
                parentid:'',
                permissionLeve:''
            },
             rules:{
                permissionName:[
                    {required:true,message:'权限名称不能为空',trigger:'blur'},
                ],
                permissionDesc:[
                    {required:true,message:'权限描述不能为空',trigger:'blur'},
                ],
                sortNum:[
                    {required:true,message:'排列序号不能为空',trigger:'blur'},
                ],
                parentid:[
                    {required:true,message:'父级权限不能为空',trigger:'blur'},
                ],
                permissionLeve:[
                    {required:true,message:'权限等级不能为空',trigger:'blur'},
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
            this.$refs['addNewPermission'].validate((valid)=>{
                if(valid){
                    this.post(this.$apis.addNewPersmission,this.addNewPermission)
                    .then((resp)=>{
                        this.addNewPermission={};
                        this.handleClose();
                        this.$store.dispatch('loadAccountPermissions')
                    })
                }else{
                    return false;
                    this.handleClose();
                }
            })
        }
    },

}
</script>
<style lang="scss" scoped>

</style>
