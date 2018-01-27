import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Table from '@/components/nav1/Table'
import Form from '@/components/nav2/Form'
import Test from '@/components/nav3/Test'
import User from '@/components/nav3/User'
import Echart from '@/components/nav4/Echart'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
      hidden: true
    },
    {
      path: '/',
      component: Home,
      hidden: true
    },
    {
      path: '/',
      name: '导航一',
      iconCls: 'fa fa-address-card',
      component: Home,
     
      children: [
        { path: 'table', component: Table, name: 'tabel' }
      ]
    },
    {
      path: '/',
      name: '导航二',
      component: Home,
      iconCls: 'el-icon-message',
      children: [
        { path: '/form', component: Form, name: 'form' }
      ]
    },
    {
      path: '/',
      name: '导航三',
      component: Home,
      iconCls: 'fa fa-id-card-o',
      children: [
        { path: '/test', component: Test, name: 'test' },
        { path: '/user', component: User, name: 'user' }
      ]
    },
    {
      path: '/',
      name: '导航四',
      component: Home,
      iconCls: 'fa fa-bar-chart',

      children: [
        { path: '/echart', component: Echart, name: 'echart' }
      ]
    },
  ]
})
