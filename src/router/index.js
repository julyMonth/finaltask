import Vue from 'vue'
import Router from 'vue-router'
import Login from "@/pages/login/Login"
// import Regist from '@/pages/regist/regist'
import Home from '@/pages/home/Home'
import Homemenu from '@/pages/home/components/Homemenu'
import Face from '@/pages/face/Face'
import Work from '@/pages/workers/workersMsg'
import Worker from "@/pages/workers/components/worker"
import Leave from "@/pages/workers/components/leavetime"
import List from '@/pages/workers/components/listofday'
import Report from "@/pages/workers/components/report"
import Menu from '@/pages/workers/components/menu'
import store from '@/store/store'
Vue.use(Router)

if (sessionStorage.getItem('token')) {
  store.commit('set_token', sessionStorage.getItem('token'))
}

const router = new Router({
  // mode: "history",
  routes: [{
      path: '/',
      redirect: 'login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children: [{
          path: '',
          redirect: "homemenu",
        },
        {
          path: 'homemenu',
          name: 'Home/Homemenu',
          component: Homemenu
        }
      ]
    },
    {
      path: '/Face',
      name: 'Face',
      component: Face,
    },
    {
      path: "/workermsg",
      name: "work",
      component: Work,
      children: [{
          path: "",
          redirect: "worker",
        },
        {
          path: "worker",
          name: "worker",
          component: Worker
        },
        {
          path: "leave",
          name: "leave",
          component: Leave
        },
        {
          path: "list",
          name: "list",
          component: List
        },
        {
          path: "report",
          name: "report",
          component: Report
        },
        {
          path: "menu",
          name: "menu",
          component: Menu
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) { //这里的requireAuth为路由中定义的 meta:{requireAuth:true}，意思为：该路由添加该字段，表示进入该路由需要登陆的
    if (store.state.token) {
      next();
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    }
  } else {
    next();
  }
})

export default router