import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/utils/xxaxios'
import apis from '@/apis'

Vue.use(Vuex)
//分装请求函数
const loadAction = (commit,payload,mutationName)=>{
  var accountInfo = JSON.parse(localStorage.getItem('accountInfo'))
  axios.get(payload.api,{message:accountInfo.message,success:accountInfo.success,allPermission:accountInfo.permissions})
  .then((resp)=>{
     resp = resp.data;
     commit(mutationName,resp)
  })
}
const toTree = (state,item)=>{
  var obj = {};
  for(let i=0;i<item.length;i++){
    var permission = item[i];
    if(!permission.parentid){
      permission.children = [];
      obj[permission._id] = permission;
    }
  }
  for(let j=0;j<item.length;j++){
    var permission = item[j];
    for(let key in obj){
      if(permission.parentid == key){
        obj[key].children.push(permission);
      }
    }
  }
  var arr = [];
  for(let key in obj){
    arr.push(obj[key])
  }
  //  console.log(arr);
  state.allShuJu = arr;
}
export default new Vuex.Store({
  state: {
    accountPermissions: [],
    allShuJu:[],
    accountInfo:[],
    allUsers:[],
    allGames:[]
  },
  getters: {
    // accountPermissions(state){
    //   return toTree(state.allPermission)
    // }
  },
  mutations: {
    LOADACCOUNTPERMISSIONS(state,payload){
      state.accountPermissions = payload;
      
      toTree(state,payload.allPermission);
    },
    LOADFINDALLROLES(state,payload){
      state.accountInfo = payload.allRoles;
    },
    //加载所有账号
    LOADFINDALLUSERS(state,payload){
      state.allUsers = payload.allUsers
    },
    //加载所有彩种
    LOADFINDALLGAMES(state,payload){
      state.allGames = payload.data
    } 
  },
  actions: {
    loadAccountPermissions({commit},payload={}){
      payload.api = apis.showAllPermission;
      loadAction(commit,payload,'LOADACCOUNTPERMISSIONS');
    },
    loadFindAllRoles({commit},payload={}){
      payload.api = apis.findAllRoles;
      loadAction(commit,payload,'LOADFINDALLROLES')
    },
    loadFindAllUsers({commit},payload={}){
      payload.api = apis.findAllUsers;
      loadAction(commit,payload,'LOADFINDALLUSERS')
    },
    loadFindAllGames({commit},payload={}){
      payload.api = apis.findAllGames;
      loadAction(commit,payload,'LOADFINDALLGAMES')
    }
  }
})
