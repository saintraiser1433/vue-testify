import { createRouter, createWebHistory } from 'vue-router'
import { ExamApi } from '@/services/exam-services'
const { getExamById } = ExamApi()
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
      path: '/question/:examId',
      name: 'Question',
      component: () => import('../views/Questions.vue'),
      beforeEnter: (to, from, next) => {
        const questionApi = getExamById(to.params.examId)
        questionApi
          .then((response) => {
            if (response.status === 200) {
              to.meta.examTitle = response.data.exam_title
              next()
            } else {
              next({ name: 'NotFound' })
            }
          })
          .catch(() => {
            next({ name: 'NotFound' })
          })
      },
      props: true
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
