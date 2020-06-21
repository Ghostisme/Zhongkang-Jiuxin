import main from '@/com/view/main'

export const loginRouter = {
  path: '/',
  name: 'task',
  meta: {
    title: '任务',
    keepAlive: true,
    left: 1,
    menu: "",
    leftMenu: "",
    letGoPage: "",
    right:""
  },
  component: () =>
    import ('@/com/modules/task/taskList.vue')
};
// const loginDetailsRouter = {
//   path: '/loginDetails',
//   name: 'loginDetails',
//   meta: {
//     title: '日志详情',
//     keepAlive: true,
//     left: 1,
//     menu: "",
//     leftMenu: "",
//     letGoPage: "",
//     right:""
//   },
//   component: () =>
//     import ('@/com/modules/task/logDetails/index.vue')
// };

const routers = {
  path: '/',
  name: 'router',
  meta: {
    title: '主页',
    access: 1
  },
  component: main,
  children: [{
    path: 'createTask',
    name: 'createTask',
    meta: {
      title: '添加任务',
      left: 1
    },
    component: () =>
      import ('@/com/modules/task/createTask.vue')
  },
  {
    path: 'taskDetails',
    name: 'taskDetails',
    meta: {
      title: '任务详情',
      left: 1
    },
    component: () =>
      import ('@/com/modules/task/taskDetails.vue')
  },{
      path: 'myStoreTask',
      name: 'myStoreTask',
      meta: {
        title: '收藏夹',
        left: 1
      },
      component: () =>
        import ('@/com/modules/task/mystoreTask/myStoreTaskList.vue')
    },{
      path: 'finishedTask',
      name: 'finishedTask',
      meta: {
        title: '已完成的任务',
        left: 1
      },
      component: () =>
        import ('@/com/modules/task/mystoreTask/finishedTaskList.vue')
    },{
      path: 'multitasking',
      name: 'multitasking',
      meta: {
        title: '任务待处理',
        left: 1
      },
      component: main,
      component: () =>
        import ('@/com/modules/task/multitasking.vue')
    },{
      path: 'taskProgress',
      name: 'taskProgress',
      meta: {
        title: '任务进展情况',
        left: 1
      },
      component: main,
      component: () =>
        import ('@/com/modules/task/taskProgress/index.vue')
    },,{
      path: 'toBeDetermined',
      name: 'toBeDetermined',
      meta: {
        title: '任务进展情况',
        left: 1
      },
      component: main,
      component: () =>
        import ('@/com/modules/task/toBeDetermined.vue')
    },
  ]
}

//通讯录
const staffList=[{
  path: '/addressList',
  name: 'addressList',
  meta: {
    title: '通讯录',
    left: 1,
    access: 1
  },
  component: main,
  children: [{
    path: 'addressListIndex',
    name: 'addressListIndex',
    meta: {
      title: '通讯录',
      left: 1,
      leftMenu: "",
      letGoPage: "",
      menu: "",
      right:""
    },
    component: () =>
      import('@/com/modules/task/choseStaff/view/addressListIndex.vue')
  },
    {
      path: 'staffChose',
      name: 'staffChose',
      meta: {
        title: '选择人员',
        left: 1,
        menu: "",
        leftMenu: "close",
        letGoPage: "",
        right:""
      },
      component: () =>
        import('@/com/modules/task/choseStaff/view/staffChoseList.vue')
    },
    {
      path: 'selectAddressList',
      name: 'selectAddressList',
      meta: {
        title: '选择相关人员',
        left: 1,
        menu: "",
        leftMenu: "cancel",
        letGoPage: "/task/createTask",
        right:"ok"
      },
      component: () =>
        import('@/com/modules/task/choseStaff/view/selectAddressList.vue')
    },
    {
      path: 'staffChoseLead',
      name: 'staffChoseLead',
      meta: {
        title: '选择人员',
        left: 1,
        menu: "",
        leftMenu: "",
        letGoPage: "",
        right:"ok"
      },
      component: () =>
        import('@/com/modules/task/choseStaff/view/staffChoseLead.vue')
    },
    {
      path: 'selectRelated',
      name: 'selectRelated',
      meta: {
        title: '选择相关人员',
        left: 1,
        leftMenu: "createtask",
        letGoPage: "",
        menu: "",
        right:""
      },
      component: () =>
        import('@/com/modules/task/choseStaff/view/selectRelated.vue')
    }]
}]
//详情通讯录
const detalStaffList=[{
  path: '/taskRecive',
  name: 'taskRecive',
  meta: {
    title: '任务接收人',
    left: 1,
    access: 1
  },
  component: main,
  children: [{
    path: 'detailChosed',
    name: 'detailChosed',
    meta: {
      title: '任务接收人',
      left: 1,
      leftMenu: "createtask",
      letGoPage: "",
      menu: "",
      right:""
    },
    component: () =>
      import('@/com/modules/task/taskDetailTo/detailChosed.vue')
  },{
    path: 'detailWarnChosed',
    name: 'detailWarnChosed',
    meta: {
      title: '任务提醒人',
      left: 1,
      leftMenu: "createtask",
      letGoPage: "",
      menu: "",
      right:""
    },
    component: () =>
      import('@/com/modules/task/taskDetailTo/detailWarnChosed.vue')
  }]
}]
//任务详情添加人员
const detailAddStaffList=[{
  path: '/detailASList',
  name: 'detailASList',
  meta: {
    title: '通讯录',
    left: 1,
    access: 1
  },
  component: main,
  children: [{
    path: 'detailAddressListIndex',
    name: 'detailAddressListIndex',
    meta: {
      title: '通讯录',
      left: 1,
      leftMenu: "",
      letGoPage: "",
      menu: "",
      right:""
    },
    component: () =>
      import('@/com/modules/task/taskDetailTo/choseStaff/view/addressListIndex.vue')
  },
    {
      path: 'detailStaffChose',
      name: 'detailStaffChose',
      meta: {
        title: '选择人员',
        left: 1,
        menu: "",
        leftMenu: "close",
        letGoPage: "",
        right:""
      },
      component: () =>
        import('@/com/modules/task/taskDetailTo/choseStaff/view/staffChoseList.vue')
    },
    {
      path: 'detailSelectAddressList',
      name: 'detailSelectAddressList',
      meta: {
        title: '选择相关人员',
        left: 1,
        menu: "",
        leftMenu: "cancel",
        letGoPage: "/task/createTask",
        right:"ok"
      },
      component: () =>
        import('@/com/modules/task/taskDetailTo/choseStaff/view/selectAddressList.vue')
    },
    {
      path: 'detailStaffChoseLead',
      name: 'detailStaffChoseLead',
      meta: {
        title: '选择人员',
        left: 1,
        menu: "",
        leftMenu: "",
        letGoPage: "",
        right:"ok"
      },
      component: () =>
        import('@/com/modules/task/taskDetailTo/choseStaff/view/staffChoseLead.vue')
    },
    {
      path: 'detailSelectRelated',
      name: 'detailSelectRelated',
      meta: {
        title: '选择相关人员',
        left: 1,
        leftMenu: "createtask",
        letGoPage: "",
        menu: "",
        right:""
      },
      component: () =>
        import('@/com/modules/task/taskDetailTo/choseStaff/view/selectRelated.vue')
    }]
}]

// 日志
const log=[{
  path: '/log',
  name: 'log',
  meta: {
    title: '日志',
    left: 1,
    access: 1
  },
  component: main,
  children: [{
    path: 'addLog',
    name: 'addLog',
    meta: {
      title: '添加日志',
      left: 1,
      leftMenu: "",
      letGoPage: "",
      menu: "",
      right:""
    },
    component: () =>
      import('@/com/modules/task/addLog/index.vue')
  },
    {
      path: 'comment',
      name: 'comment',
      meta: {
        title: '评论',
        left: 1,
        menu: "",
        leftMenu: "close",
        letGoPage: "",
        right:""
      },
      component: () =>
        import('@/com/modules/task/comment/index.vue')
    },{
      path: 'rewardsPunishments',
      name: 'rewardsPunishments',
      meta: {
        title: '红包打赏选择人员',
        left: 1,
        menu: "",
        leftMenu: "close",
        letGoPage: "",
        right:""
      },
      component: () =>
        import('@/com/modules/task/rewardsPunishments/index.vue')
    },{
      path: 'logDetails',
      name: 'logDetails',
      meta: {
        title: '日志详情',
        left: 1,
        menu: "",
        leftMenu: "close",
        letGoPage: "",
        right:""
      },
      component: () =>
        import('@/com/modules/task/logDetails/index.vue')
    },{
      path: 'rewardPunishmentDetails',
      name: 'rewardPunishmentDetails',
      meta: {
        title: '奖罚明细',
        left: 1,
        menu: "",
        leftMenu: "close",
        letGoPage: "",
        right:""
      },
      component: () =>
        import('@/com/modules/task/rewardPunishmentDetails/index.vue')
    }]
}]
//日志@人员选择通讯录
const logStaffList=[{
  path: '/logAddressList',
  name: 'logAddressList',
  meta: {
    title: '日志通讯录',
    left: 1,
    access: 1
  },
  component: main,
  children: [{
    path: 'logAddressListIndex',
    name: 'logAddressListIndex',
    meta: {
      title: '日志通讯录',
      left: 1,
      leftMenu: "",
      letGoPage: "",
      menu: "",
      right:"",
      keepAlive: false
    },
    component: () =>
      import('@/com/modules/log/choseStaff/view/addressListIndex.vue')
  },
    {
      path: 'logStaffChose',
      name: 'logStaffChose',
      meta: {
        title: '日志选择人员',
        left: 1,
        menu: "",
        leftMenu: "close",
        letGoPage: "",
        right:"",
        keepAlive: false
      },
      component: () =>
        import('@/com/modules/log/choseStaff/view/staffChoseList.vue')
    },
    {
      path: 'logSelectAddressList',
      name: 'logSelectAddressList',
      meta: {
        title: '日志选择相关人员',
        left: 1,
        menu: "",
        leftMenu: "cancel",
        letGoPage: "",
        right:"ok",
        keepAlive: false
      },
      component: () =>
        import('@/com/modules/log/choseStaff/view/selectAddressList.vue')
    },
    {
      path: 'logStaffChoseLead',
      name: 'logStaffChoseLead',
      meta: {
        title: '日志选择人员',
        left: 1,
        menu: "",
        leftMenu: "",
        letGoPage: "",
        right:"ok",
        keepAlive: false
      },
      component: () =>
        import('@/com/modules/log/choseStaff/view/staffChoseLead.vue')
    },
    {
      path: 'logSelectRelated',
      name: 'logSelectRelated',
      meta: {
        title: '日志选择相关人员',
        left: 1,
        leftMenu: "",
        letGoPage: "",
        menu: "",
        right:"",
        keepAlive: false
      },
      component: () =>
        import('@/com/modules/log/choseStaff/view/selectRelated.vue')
    }]
}]

// 审批

const leaveRouter={
  path: '/',
  name: 'leave',
  meta: {
    title: '主页',
    access: 1
  },
  component: main,
  children: [{
    path: 'leaveMain',
    meta: {
      title: '请假',
      access: 1
    },
    name: 'leaveMain',
    component: () =>
      import ('@/com/modules/task/audit/leave.vue')
  },
    {
      path: 'detail',
      meta: {
        title: '请假单',
        access: 1
      },
      name: 'detail',
      component: () =>
        import ('@/com/modules/task/audit/detail.vue')
    },
    {
      path: 'menu',
      meta: {
        title: '审批',
        access: 1
      },
      name: 'menu',
      component: () =>
        import ('@/com/modules/task/audit/menu.vue')
    },
    {
      path: 'filter',
      meta: {
        title: '筛选',
        access: 1
      },
      name: 'filter',
      component: () =>
        import ('@/com/modules/task/audit/filter.vue')
    },
    {
      path: 'select',
      meta: {
        title: '查询',
        access: 1
      },
      name: 'select',
      component: () =>
        import ('@/com/modules/task/audit/select.vue')
    },
    {
      path: 'chosePerson',
      meta: {
        title: '添加人员',
        access: 1
      },
      name: 'chosePerson',
      component: () =>
        import ('@/com/modules/task/audit/chosePerson.vue')
    },
    {
      path: 'self',
      meta: {
        title: '个人中心',
        access: 1
      },
      name: 'self',
      component: () =>
        import ('@/com/view/index.vue')
    }]
}
const appRouters = [
    loginRouter,
    routers,
  ...staffList,
  ...detalStaffList,
  ...detailAddStaffList,
  ...log,
  ...logStaffList,
    leaveRouter,
    // loginDetailsRouter
]

export default appRouters
