<template>
    <div id="login">
        <div id="container">
            <h1 style="font-size:50px;">可米彩票</h1>
            <el-form  status-icon label-width="70px" :model="userInfo" :rules="rules" ref="userInfo">
                <el-form-item label="用户名" prop="accountName">
                    <el-input v-model="userInfo.accountName"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="userInfo.password" type="password"></el-input>
                </el-form-item>
            </el-form>
            <el-button type='primary' @click="login">登录</el-button>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            userInfo:{
                accountName:'',
                password:''
            },
            rules:{
                accountName:[
                    {required:true,message:'用户名不能为空',trigger:'blur'},
                    {min:3,max:20,message:'用户名不能小于3和大于20个字符',trigger:'blur'}
                ],
                password:[
                    {required:true,message:'密码不能为空',trigger:'blur'}
                ]
            }
        }
    },
    methods:{
        login(){
            console.log(this.$refs);
            this.$refs['userInfo'].validate((valid)=>{
                if(valid){
                    console.log('校验通过');
                    this.$http.post(this.$apis.signin,this.userInfo)
                    .then((resp)=>{
                        console.log(resp)
                        var username = resp.data.username;
                        var token = resp.data.token;
                        var success = resp.data.success;
                        var permissions = resp.data.response.permissions;
                        if(success){
                            localStorage.setItem("token",token);
                            // console.log(resp.data.response)
                            localStorage.setItem("accountInfo",JSON.stringify(resp.data))
                            var query = this.$route.query;
                            if(!query.redirect){
                                this.$router.push({path:'/home'})
                            }else{
                                this.$router.push({path:query.direct})
                            }
                        }else{
                            this.$message.error('登录失败',请检查用户名和密码)
                        }
                    }).catch((err)=>{
                        console.log(err)
                    })
                }else{
                    console.log('登录失败')
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
    #login{
        width: 100%;
        height: 100%;
        padding: 10px;
        box-sizing: border-box;
        display: flex;
        justify-content: flex-end;
        background: url(http://benyouhuifile.it168.com/forum/201310/23/162906bl2ttfnm775b1sq8.jpg) no-repeat 0px 0px;
        background-size: 100%
    }
    #container{
        width: 30%;
        height: 100%;
        min-width: 400px;
        background: rgba(0, 0 , 0 , .3);
        border-radius: 5px;
        box-shadow: 0 0 10px 5px lightgray;
        text-align: center;
        color:#ccc;
        display: flex;
        flex-direction: column;
        justify-content: space-around
    }
</style>


