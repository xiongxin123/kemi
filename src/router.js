import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {path:'/login',name:'login',component:()=>import(/* webpackChunkName:'login'*/'@/components/login/login')},
    {path:'/home',name:'home',component:()=>import(/* webpackChunkName:'home'*/'@/components/home'),
      children:[
        {path:'/xitong',name:'系统管理',component:()=>import(/* webpackChunkName:'xitong'*/'@/components/xitong/xitong'),
          children:[
            {path:'juese',name:'角色管理',component:()=>import(/* webpackChunkName:'juese'*/'@/components/xitong/juese/juese'),
              children:[
                {path:'addNewRole',name:'addNewRole',component:()=>import(/* webpackChunkName:'addNewRole'*/'@/components/xitong/juese/addNewRole')}
              ]
            },
            {path:'yonghu',name:'用户管理',component:()=>import(/* webpackChunkName:'yonghu'*/'@/components/xitong/yonghu/yonghu'),
              children:[
                {path:'addNewUser',name:'addNewUser',component:()=>import(/* webpackChunkName:'addNewUser'*/'@/components/xitong/yonghu/addNewUser')}
              ]
            },
            {path:'quanxian',name:'权限管理',component:()=>import(/* webpackChunkName:'quanxian'*/'@/components/xitong/quanxian/quanxian'),
              children:[
                {path:'addNewPermission',name:'addNewPermission',component:()=>import(/* webpackChunkName:'addNewPermission'*/'@/components/xitong/quanxian/addNewPermission')}
              ]
            },
          ]
        },
        {path:'/caipiao',name:'彩票管理',component:()=>import(/* webpackChunkName:'caipiao'*/'@/components/caipiao/caipiao'),
          children:[
            {path:'caipiaoList',name:'彩票列表',component:()=>import(/* webpackChunkName:'caipiaoList'*/'@/components/caipiao/caipiaoList/caipiaoList')}
          ]
        },
        {path:'/guanggao',name:'广告管理',component:()=>import(/* webpackChunkName:'guanggao'*/'@/components/guanggao/guanggao')},
        {path:'/xinwen',name:'新闻管理',component:()=>import(/* webpackChunkName:'xinwen'*/'@/components/xinwen/xinwen')},
      ]
    },
  ]
})
