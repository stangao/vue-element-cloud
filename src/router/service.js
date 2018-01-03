/**
 * Created by 乃波 on 2017-9-11.
 */
import BuyService from '../pages/service/BuyService.vue'
import ConfigService from '../pages/service/ConfigService.vue'
import ManagerService from '../pages/service/ManagerService.vue'
import ManagerServiceConfig from '../pages/service/ManagerServiceConfig.vue'
import ManagerServiceSchedule from '../pages/service/ManagerServiceSchedule.vue'
import ManagerServiceTask from '../pages/service/ManagerServiceTask.vue'
import ServiceBill from '../pages/service/ServiceBill.vue'

export default{
  routes: [
    {
      path: '/buyService',
      name: 'buyService',
      component: BuyService,
    },
    {
      path: '/configService',
      name: 'configService',
      component: ConfigService,
    },
    {
      path: '/managerService',
      name: 'managerService',
      component: ManagerService,
    },
    {
      path: '/managerServiceConfig',
      name: 'managerServiceConfig',
      component: ManagerServiceConfig,
    },
    {
      path: '/managerServiceSchedule',
      name: 'managerServiceSchedule',
      component: ManagerServiceSchedule,
    },
    {
      path: '/managerServiceTask',
      name: 'managerServiceTask',
      component: ManagerServiceTask,
    },
    {
      path: '/serviceBill',
      name: 'serviceBill',
      component: ServiceBill,
    },
  ]
}
