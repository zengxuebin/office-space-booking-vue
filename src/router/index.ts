import { createRouter, createWebHistory } from 'vue-router'

export const managerRoutes = [
  {
    path: '/manager/index',
    name: 'Index',
    meta: {
      title: '首页',
      icon: 'vxe-icon-home'
    },
    component: () => import('@/layout/Index.vue'),
    children: [
      {
        path: '/manager/index',
        name: 'Index',
        hidden: false,
        meta: {
          title: '首页',
          icon: 'vxe-icon-home'
        },
        component: () => import('@/views/manager/Index.vue')
      },
    ]
  },
]

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/main',
    name: 'Main',
    component: () => import('@/views/Main.vue'),
    children: [
      {
        path: '/space',
        name: 'space',
        component: () => import('@/views/Space.vue'),
      },
      {
        path: '/spaceDetail',
        name: 'spaceDetail',
        component: () => import('@/views/SpaceDetail.vue'),
      },
      {
        path: 'test2',
        name: 'Test2',
        component: () => import('@/views/Test2.vue'),
      },
      {
        path: '/officeSpace',
        name: 'officeSpace',
        component: () => import('@/views/OfficeSpace.vue'),
      },
      {
        path: '/officeSpaceDetail',
        name: 'officeSpaceDetail',
        component: () => import('@/views/OfficeSpaceDetail.vue'),
      },
      {
        path: '/createAppointment',
        name: 'createAppointment',
        component: () => import('@/views/CreateAppointment.vue'),
      },
      {
        path: '/pendingAppointment',
        name: 'pendingAppointment',
        component: () => import('@/views/PendingAppointment.vue'),
      }
    ]
  }
].concat(managerRoutes)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
