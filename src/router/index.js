import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'login',
    props: true,
    component: () => import('../views/LoginView')
  },
  {
    path: '/register',
    name: 'register',
    props: true,
    component: () => import('../views/RegisterView.vue')
  },
  {
    path: '/home',
    name: 'home',
    props: true,
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/home/details/:id',
    name: 'details',
    props: true,
    component: () => import('../views/DetailView.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    props: true,
    component: () => import('../views/AdminView.vue')
  },
  {
    path: '/admin/create',
    name: 'create',
    props: true,
    component: () => import('../views/AdminCreateView.vue')
  },
  {
    path: '/admin/edit/:id',
    name: 'edit',
    props: true,
    component: () => import('../views/AdminEditView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
