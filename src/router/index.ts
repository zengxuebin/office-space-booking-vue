import { createRouter, createWebHistory } from 'vue-router'

export const managerRoutes = [
  {
    path: '/index',
    name: 'index',
    component: () => import('@/layout/Index.vue'),
    children: [
      {
        path: '/index',
        name: 'index',
        hidden: false,
        meta: {
          title: '首页',
          icon: 'vxe-icon-home-fill'
        },
        component: () => import('@/views/manager/Index.vue')
      },
    ],
  },
  {
    path: '/audit',
    name: 'audit',
    component: () => import('@/layout/Index.vue'),
    children: [
      {
        path: '/audit/space',
        name: 'auditSpace',
        hidden: false,
        meta: {
          title: '预约审核',
          icon: 'vxe-icon-envelope-open-fill'
        },
        component: () => import('@/views/manager/Audit.vue')
      },
    ],
  },
  {
    path: '/spaceManager',
    name: 'spaceManager',
    hidden: false,
    meta: {
      title: '共享空间管理',
      icon: 'vxe-icon-company'
    },
    component: () => import('@/layout/Index.vue'),
    children: [
      {
        path: '/spaceManager/space',
        name: 'Collect',
        hidden: false,
        meta: {
          title: '空间管理',
          icon: 'vxe-icon-cloud-upload'
        },
        component: () => import('@/views/manager/space/SpaceManager.vue')
      },
      {
        path: '/spaceManager/category',
        name: 'Location',
        hidden: false,
        meta: {
          title: '空间类别管理',
          icon: 'vxe-icon-location-fill'
        },
        component: () => import('@/views/manager/space/SpaceCategory.vue')
      },
      {
        path: '/spaceManager/equipment',
        name: 'equipment',
        hidden: false,
        meta: {
          title: '空间设备管理',
          icon: 'vxe-icon-flag-fill'
        },
        component: () => import('@/views/manager/space/SpaceEquipment.vue')
      },
      {
        path: '/spaceManager/location',
        name: 'location',
        hidden: false,
        meta: {
          title: '空间位置管理',
          icon: 'vxe-icon-location-fill'
        },
        component: () => import('@/views/manager/space/SpaceLocation.vue')
      },
    ]
  },
  {
    path: '/creditScore',
    name: 'creditScore',
    hidden: false,
    component: () => import('@/layout/Index.vue'),
    children: [
      {
        path: '/creditScore/manager',
        name: 'spaceAudit',
        hidden: false,
        meta: {
          title: '信誉分管理',
          icon: 'vxe-icon-chart-line'
        },
        component: () => import('@/views/manager/CreditScore.vue')
      },
    ]
  },
  {
    path: '/account',
    name: 'account',
    hidden: false,
    component: () => import('@/layout/Index.vue'),
    children: [
      {
        path: '/account/manager',
        name: 'account',
        hidden: false,
        meta: {
          title: '账户管理',
          icon: 'vxe-icon-success-circle-fill'
        },
        component: () => import('@/views/manager/Account.vue')
      },
    ]
  },
  {
    path: '/favorite',
    name: 'favorite',
    hidden: false,
    component: () => import('@/layout/Index.vue'),
    children: [
      {
        path: '/favorite/manager',
        name: 'favorite',
        hidden: false,
        meta: {
          title: '用户收藏管理',
          icon: 'vxe-icon-star-fill'
        },
        component: () => import('@/views/manager/Favorite.vue')
      },
    ]
  },
  {
    path: '/transaction',
    name: 'transaction',
    hidden: false,
    component: () => import('@/layout/Index.vue'),
    children: [
      {
        path: '/transaction/manager',
        name: 'transaction',
        hidden: false,
        meta: {
          title: '充值管理',
          icon: 'vxe-icon-unlock-fill'
        },
        component: () => import('@/views/manager/Transaction.vue')
      },
    ]
  },
  {
    path: '/order',
    name: 'order',
    hidden: false,
    component: () => import('@/layout/Index.vue'),
    children: [
      {
        path: '/order/manager',
        name: 'order',
        hidden: false,
        meta: {
          title: '订单管理',
          icon: 'vxe-icon-goods-fill'
        },
        component: () => import('@/views/manager/Order.vue')
      },
    ]
  },
  {
    path: '/system',
    name: 'system',
    hidden: false,
    meta: {
      title: '系统管理',
      icon: 'vxe-icon-setting-fill'
    },
    component: () => import('@/layout/Index.vue'),
    children: [
      {
        path: '/system/user',
        name: 'user',
        hidden: false,
        meta: {
          title: '用户管理',
          icon: 'vxe-icon-user'
        },
        component: () => import('@/views/manager/system/User.vue')
      },
      {
        path: '/system/menu',
        name: 'menu',
        hidden: false,
        meta: {
          title: '字典管理',
          icon: 'vxe-icon-menu'
        },
        component: () => import('@/views/manager/system/Dict.vue')
      },
      {
        path: '/system/role',
        name: 'role',
        hidden: false,
        meta: {
          title: '角色管理',
          icon: 'vxe-icon-user-fill'
        },
        component: () => import('@/views/manager/system/Role.vue')
      },
      {
        path: '/system/dept',
        name: 'dept',
        hidden: false,
        meta: {
          title: '部门管理',
          icon: 'vxe-icon-flow-branch'
        },
        component: () => import('@/views/manager/system/Dept.vue')
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
      },
      {
        path: '/favorite',
        name: 'favorite',
        component: () => import('@/views/Favorite.vue'),
      },
      {
        path: '/creditScore',
        name: 'creditScore',
        component: () => import('@/views/CreditScore.vue'),
      }
    ]
  }
].concat(managerRoutes)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
