import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'


import home from '@/pages/home'
import search from '@/pages/search'
import dian from '@/pages/list/dian'
import nv from '@/pages/list/nv'
import yun from '@/pages/list/yun'
import shou from '@/pages/list/shou'
import hua from '@/pages/list/hua'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      children:[
        {
          path:'dian',
          name:"dian",
          component:dian
        },
        {
          path:'nv',
          name:"nv",
          component:nv
        },
        {
          path:'yun',
          name:"yun",
          component:yun
        },
        {
          path:'shou',
          name:"shou",
          component:shou
        },
        {
          path:'hua',
          name:"hua",
          component:hua
        }
      ]
    },
    {
      path:'/search',
      name:'search',
      component:search
    }
  ]
})
