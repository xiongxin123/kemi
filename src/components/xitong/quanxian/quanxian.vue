<template>
    <div id="juese">
        <el-button type="primary" @click="pushView({name:'addNewPermission'})">新增权限</el-button>
        <el-menu
          default-active="1"
          background-color="#fff"
          text-color="#000"
          active-text-color="#ffd04b">
          <el-submenu v-for="(item,key) in allShuJu" :index='""+key' :key="item._id">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.permissionDesc}}</span>
            </template>
              <el-menu-item :index="key+'-'+index"  v-for="(child,index) in item.children" :key='child._id'>{{child.permissionDesc}}</el-menu-item>
          </el-submenu>
        </el-menu>
        <router-view></router-view>
    </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
    computed:{
        ...mapState(['allShuJu'])
    }
}
</script>
<style lang="scss" scoped>

</style>