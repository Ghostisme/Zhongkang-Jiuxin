import main from '@/com/view/main'

export const loginRouter = {
  path: '/login',
  name: 'login',
  meta: {
    title: '登录'
  },
  component: () =>
    import ('@/com/view/login.vue')
};

const routers = {
  path: '/',
  name: 'router',
  meta: {
    title: '主页',
    access: 1
  },
  component: main,
  children: [{
    path: 'index',
      meta: {
        title: '首页',
        access: 1
      },
      name: 'index',
      component: () =>
        import ('@/com/view/index.vue')
  },
  {
    path: 'westem',
      meta: {
        title: '西药饮片',
        access: 1
      },
      name: 'westem',
      component: () =>
        import ('@/com/modules/westernMedicine/view/index.vue')
  },
  {
    path: 'cMedicnee',
      meta: {
        title: '中药饮片',
        access: 1
      },
      name: 'cMedicnee',
      component: () =>
        import ('@/com/modules/CMedicine/view/index.vue')
  },
  {
    path: 'inspection',
      meta: {
        title: '首页',
        access: 1
      },
      name: 'inspection',
      component: () =>
        import ('@/com/modules/checkl/view/inspectionInspection.vue')
  },
  {
    path: 'treatment',
      meta: {
        title: '治疗项目',
        access: 1
      },
      name: 'treatment',
      component: () =>
        import ('@/com/modules/treatmentProject/view/index.vue')
  },
  {
      path: 'diagnosisF1',
      name: 'diagnosisF1',
      meta: {
        title: '主诉诊断F1',
        access: 1
      },
      component: () =>
        import ('@/com/modules/diagnosis/diagnosisF1.vue')
    },
    {
      path: 'controlledDrugs',
      name: 'controlledDrugs',
      meta: {
        title: '管制药品',
        access: 1
      },
      component: () =>
        import ('@/com/modules/controlledDrugs/index.vue')
    },
    {
      path: 'past',
      name: 'past',
      meta: {
        title: '过往',
        access: 1
      },
      component: () =>
        import ('@/com/modules/past/index.vue')
    }
  ]
}
const pageRouters={
  path: '/diagnosis',
  name: 'diagnosis',
  meta: {
    title: '主诉诊断'
  },
  component: () =>
    import ('@/com/modules/diagnosis/Diagnosis.vue')
}
const pageRoutersF1={
  path: '/diagnosisF1',
  name: 'diagnosisF1',
  meta: {
    title: '主诉诊断F1'
  },
  component: () =>
    import ('@/com/modules/diagnosis/diagnosisF1.vue')
};
const pageRoutersF1Table={
  path: '/diagnosisF1Table',
  name: 'diagnosisF1Table',
  meta: {
    title: '主诉诊断F1表格'
  },
  component: () =>
    import ('@/com/modules/diagnosis/diagnosisF1Table.vue')
}
const alertTamp={
  path: '/alertTamp',
  name: 'alertTamp',
  meta: {
    title: '主诉诊断F1表格'
  },
  component: () =>
    import ('@/com/command/checkl_inframTable/inframTable.vue')
}
const appRouters = [
  loginRouter,
  routers,
  pageRouters,
  pageRoutersF1,
  pageRoutersF1Table,
  alertTamp,
]

export default appRouters
