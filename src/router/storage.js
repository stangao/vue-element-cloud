/**
 * Created by 乃波 on 2017-9-11.
 */
import BuyStorage from '../pages/storage/BuyStorage.vue'
import BuyStorageResult from '../pages/storage/BuyStorageResult.vue'
import ManagerStorage from '../pages/storage/ManagerStorage.vue'
import ManagerSnapShot from '../pages/storage/ManagerSnapShot.vue'


export default{
  routes: [
    {
      path: '/buyStorage',
      name: 'buyStorage',
      component: BuyStorage,
    },
    {
      path: '/buyStorageResult',
      name: 'buyStorageResult',
      component: BuyStorageResult,
    },
    {
      path: '/managerStorage',
      name: 'managerStorage',
      component: ManagerStorage,
    },
    {
      path: '/managerSnapShot',
      name: 'managerSnapShot',
      component: ManagerSnapShot,
    }
  ]
}
