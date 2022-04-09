import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/layout/Layout.vue'
import Login from '../views/login/Login.vue'
import Register from '../views/login/Register.vue'

// 社科
import Home from '../views/home/Home.vue'
import Launch from '../views/launch/ItemLaunch.vue'
import Items from '../views/Items/index.vue'
import Bidding from '../views/Items/Bidding/index.vue'
import PreliminaryExamination from '../views/Items/PreliminaryExamination/index.vue'
import ExamineInvition from '../views/Items/ExamineInvitation/index.vue'
import DetailedExamination from '../views/Items/DetailedExamination/index.vue'
import Calibration from "../views/Items/Calibration/index.vue"
import Schedule from '../views/Items/Schedule/index.vue'
import Finished from '../views/Items/Finished/index.vue'
import User from '../views/users/index.vue'

// 专家
import Layoutex from '../viewExpert/layout/Layout.vue'
import Homeex from '../viewExpert/home/home.vue'
import Bidex from '../viewExpert/bid/index.vue'
import Examineex from '../viewExpert/myexamine/index.vue'
import Userex from '../viewExpert/users/index.vue'
import Itemsex from '../viewExpert/Items/index.vue'
import Biddingex from "../viewExpert/Items/Bidding/index.vue"
import DetailedExaminationex from '../viewExpert/Items/DetailedExamination/index.vue'
import PreliminaryExaminationex from "../viewExpert/Items/PreliminaryExamination/index.vue"
import Calibrationex from '../viewExpert/Items/Calibration/index.vue'
import Scheduleex from '../viewExpert/Items/Schedule/index.vue'
import Finishedex from '../viewExpert/Items/Finished/index.vue'


Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    name:'login',
    component:Login
  },
  {
    path:'/register',
    name:'register',
    component:Register
  },
  // 社科端口
  {
    path:'/layout',
    component: Layout,
    children:[
      {
        path:'/home',
        name:"home",
        component:Home
      },{
        path:'/launch',
        name:'launch',
        component:Launch
      },{
        path:'/items',
        name:'items',
        component:Items,
        redirect:'/items/bidding',
        children:[
          {
            path:'bidding',
            name:'bidding',
            component:Bidding
          },{
            path:'preliminaryexamination',
            name:'preliminaryexamination',
            component:PreliminaryExamination
          },{
            path:'examineinvition',
            name:'examineinvition',
            component:ExamineInvition
          },{
            path:'detailedExamination',
            name:'detailedExamination',
            component:DetailedExamination
          },{
            path:'schedule',
            name:'schedule',
            component:Schedule
          },{
            path:'calibration',
            name:'calibration',
            component:Calibration
          },{
            path:'finished',
            name:'finished',
            component:Finished
          }
        ]
      },{
        path:'/user',
        name:'user',
        component:User
      }
    ]
  },
  // 专家端口
  {
    path:'/Layoutex',
    component: Layoutex,
    children:[{
      path:'/homeex',
      name:'homeex',
      component:Homeex
    },{
      path:'/bidex',
      name:'bidex',
      component:Bidex
    },{
      path:'/itemsex',
      name:'itemsex',
      component:Itemsex,
      redirect:'/itemsex/biddingex',
      children:[
        {
          path:'biddingex',
          name:'biddingex',
          component:Biddingex
        },{
          path:'preliminaryexaminationex',
          name:'preliminaryexaminationex',
          component:PreliminaryExaminationex
        },
        ,{
          path:'detailedExaminationex',
          name:'detailedExaminationex',
          component:DetailedExaminationex
        },{
          path:'calibrationex',
          name:'calibrationex',
          component:Calibrationex
        },{
          path:'scheduleex',
          name:'scheduleex',
          component:Scheduleex
        },{
          path:'finishedex',
          name:'finishedex',
          component:Finishedex
        }
      ]
    },
    {
      path:'/examineex',
      name:'examineex',
      component:Examineex
    },
    
    {
      path:'/userex',
      name:'Userex',
      component:Userex
    },]
  }
  
]

const router = new VueRouter({
  routes
})

export default router
