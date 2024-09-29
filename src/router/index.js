import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/Course.vue')
    },
    {
      path: '/examinee',
      name: 'Examinee',
      component: () => import('../views/Examinee.vue')
    },
    {
      path: '/deans',
      name: 'Deans',
      component: () => import('../views/Deans.vue')
    },
    {
      path: '/department',
      name: 'Department',
      component: () => import('../views/Department.vue')
    },
    {
      path: '/course',
      name: 'Course',
      component: () => import('../views/Course.vue')
    },
    {
      path: '/exam',
      name: 'Exam',
      component: () => import('../views/Exam.vue')
    },
    {
      path: '/rankings',
      name: 'Rankings',
      component: () => import('../views/Exam.vue')
    },
    {
      path: '/backup',
      name: 'Backup',
      component: () => import('../views/Backup.vue')
    }
  ]
})

export default router
