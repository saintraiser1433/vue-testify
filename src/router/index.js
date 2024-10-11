import { createRouter, createWebHistory } from 'vue-router'
import { QuestionApi } from '@/services/question'
import { ExamApi } from '@/services/exam'

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
      path: '/question/:id',
      name: 'Question',
      component: () => import('../views/Questions.vue'),
      beforeEnter: (to, from, next) => {
        const questionApi = ExamApi().getExamById(to.params.id)
        questionApi
          .then((response) => {
            if (response.status === 200) {
              next()
            } else {
              next({ name: 'NotFound' })
            }
          })
          .catch(() => {
            next({ name: 'NotFound' })
          })
      }
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
    },
    {
      path: '/:catchAll(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFound.vue')
    }
  ]
})

export default router
