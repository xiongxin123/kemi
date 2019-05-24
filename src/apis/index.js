import Vue from 'vue'
var apis = {
    signin:'/signin',//登录接口
    //权限管理接口
    addNewPersmission:'/system/permission/addNewPersmission',
    deletePermission:'/system/permission/deletePermission',
    showAllPermission:'/system/permission/showAllPermission',
    findPermissionById:'/system/permission/findPermissionById',
    //角色管理
    addNewRole:'/system/role/addNewRole',
    deleteRole:'/system/role/deleteRole',
    updateRoleInfo:'/system/permission/updateRoleInfo',
    findAllRoles:'/system/role/findAllRoles',
    findRoleInfoById:'/system/role/findRoleInfoById',
    //账号管理
    addNewUser:'/system/user/addNewUser',
    deleteUser:'/system/user/deleteUser',
    updateUserInfo:'/system/user/updateUserInfo',
    findUserInfoById:'/system/user/findUserInfoById',
    findAllUsers:'/system/user/findAllUsers',
    //彩票管理
    findAllGames:'/gameManage/games/findAllGames',
    addNewGames:'/gameManage/games/addNewGame',
    findByGameName:'/gameManage/games/findByGameName'


}
Vue.prototype.$apis = apis;
export default apis;