/**
 * Created by 军标 on 2017-9-11.
 */
import Login from '../pages/Login.vue'

export default{
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
      title:'登录页面'
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      title:'登录页面'
    }
  ]
}
