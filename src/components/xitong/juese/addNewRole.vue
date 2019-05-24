<template>
    <div id="addNewRole">
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="40%"
            :before-close="handleClose">
            
            <el-form :model="addNewInfo" status-icon :rules="rules" ref="addNewInfo" label-width="80px">
                <el-form-item label="角色名称" prop="roleName">
                    <el-input v-model="addNewInfo.roleName"></el-input>
                </el-form-item>
                <el-form-item label="角色描述" prop="roleDesc">
                    <el-input v-model="addNewInfo.roleDesc"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-tree
                        ref="tree"
                        :data="allShuJu"
                        show-checkbox
                        node-key="_id"
                        :props="defaultProps"
                        @check-change="handleCheckChange">
                    </el-tree>
                </el-form-item>
            </el-form>

            

            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="addNew">{{isUpdateRole?'更新':'确定'}}</el-button>
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
            isUpdateRole:false,
            addNewInfo:{
                roleName:'',
                roleDesc:'',
                permissions:[]
            },
            rules:{
                roleName:[
                    {required:true,message:'角色名称不能为空',trigger:'blur'},
                    {min:3,max:20,message:'用户名不能小于3和大于10个字符',trigger:'blur'}
                ],
                roleDesc:[
                    {required:true,message:'角色描述不能为空',trigger:'blur'},
                    {min:3,max:20,message:'角色描述不能小于3和大于10个字符',trigger:'blur'}
                ]
            },
            defaultProps: {
                children: 'children',
                label: 'permissionDesc'
            }
            
        }
    },
    methods:{
        handleCheckChange(){
            let res = this.$refs.tree.getCheckedNodes()
            let arr = [];
            // console.log(res)
            res.forEach((item)=>{
                arr.push(item._id)
            })
            this.addNewInfo.permissions = arr;
        },
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
            this.$refs['addNewInfo'].validate((valid)=>{
                if(valid){
                    // console.log(this.addNewInfo)
                    var url = '';
                    if(this.isUpdateRole){
                        url = this.$apis.updateRoleInfo
                    }else{
                        url = this.$apis.addNewRole
                    }
                    this.post(url,this.addNewInfo)
                    .then((resp)=>{
                        this.addNewInfo={};
                        this.handleClose();
                        this.$store.dispatch('loadFindAllRoles')
                    })
                }else{
                    return false;
                    this.handleClose();
                }
            })
        }
    },
    computed:{
        ...mapState(['allShuJu']),
        ...mapState(['allRoles'])
    },
    created(){
        console.log(this.$route.params.addNewInfo)
        if(this.$route.params.addNewInfo){
            this.isUpdateRole = true;
            this.addNewInfo = this.$route.params.addNewInfo
        }else{
            this.isUpdateRole = false;
        }
    }
}
</script>
<style lang="scss" scoped>

</style>
