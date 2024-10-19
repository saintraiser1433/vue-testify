import { createRouter, createWebHistory } from 'vue-router'
import { ExamApi } from '@/services/exam-services'
const { getExamById } = ExamApi()
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/Home.vue'),
      meta: { breadcrumbs: 'Home' }
    },
    {
      path: '/examinee',
      name: 'Examinee',
      component: () => import('../views/Examinee.vue'),
      meta: { breadcrumbs: 'Examinee' }
    },
    {
      path: '/deans',
      name: 'Deans',
      component: () => import('../views/Deans.vue'),
      meta: { breadcrumbs: 'Deans' }
    },
    {
      path: '/department',
      name: 'Department',
      component: () => import('../views/Department.vue'),
      meta: { breadcrumbs: 'Department' }
    },
    {
      path: '/course',
      name: 'Course',
      component: () => import('../views/Course.vue'),
      meta: { breadcrumbs: 'Course' }
    },
    {
      path: '/exam',
      name: 'Exam',
      component: () => import('../views/Exam.vue'),
      meta: { breadcrumbs: 'Exam' },
      children: [
        {
          path: 'question/:examId', // Ensure this path is correct
          name: 'Question',
          component: () => import('../views/Questions.vue'),
          meta: { breadcrumbs: 'Question' },
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
        }
      ]
    },

    {
      path: '/rankings',
      name: 'Rankings',
      component: () => import('../views/Exam.vue'),
      meta: { breadcrumbs: 'Rankings' }
    },
    {
      path: '/backup',
      name: 'Backup',
      component: () => import('../views/Backup.vue'),
      meta: { breadcrumbs: 'Backup' }
    },
    {
      path: '/:catchAll(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFound.vue'),
      meta: { breadcrumbs: 'Not Found' }
    }
  ]
})

export default router
