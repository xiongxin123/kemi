<template>
    <div id="navbar">

         <el-menu
          default-active="1"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-submenu v-for="(item,key) in allShuJu" :index='""+key' :key="item._id">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span @click="$router.push({name:item.permissionDesc})">{{item.permissionDesc}}</span>
            </template>
              <el-menu-item :index="key+'-'+index"  v-for="(child,index) in item.children" :key='child._id' @click="$router.push({name:child.permissionDesc})">{{child.permissionDesc}}</el-menu-item>
          </el-submenu>

        </el-menu>

    </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
    methods:{


    },
    computed:{
      ...mapState(['allShuJu'])
    }
}
</script>
<style lang="scss" scoped>
// #navbar{

// }
</style>
