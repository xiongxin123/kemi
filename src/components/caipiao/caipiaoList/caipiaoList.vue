<template>
    <div id="caipiaoList">
        彩票列表
        <div style="display:flex">
            <div class="demo-image" v-for="(item,index) in allGames" :key="index" style="display:flex">
                <div class="block" v-for="(key,index) in item.games" :key="index+key" style="display:flex;flex-direction:column">
                    <el-image 
                        style="width: 80px; height: 80px"
                        :src="url+key.icon2"
                        :fit="key.icon">
                    </el-image>
                    <span class="demonstration">{{ key.cn }}</span>
                </div>
            </div>
            <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
        </div>
    </div>
</template>
<script>
import {mapState} from "vuex"
export default {
    data(){
        return {
            url:"http://localhost:3000",
            dialogImageUrl: '',
            dialogVisible: false
        }
    },
    methods:{
        handleRemove(file, fileList){
            console.log(file, fileList);
        },
        handlePictureCardPreview(file){
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        }
    },
    computed:{
        ...mapState(['allGames'])
    },
    created(){
        this.$store.dispatch('loadFindAllGames')
    }
}
</script>
<style lang="scss" scoped>

</style>
