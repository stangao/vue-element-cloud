/**
 * Created by 军标 on 2017-9-11.
 */
import CreateCluster from '../pages/cluster/CreateCluster.vue'
import ManagerCluster from '../pages/cluster/ManagerCluster.vue'

export default{
  routes: [
    {
      path: '/createCluster',
      name: 'createCluster',
      component: CreateCluster,
    },
    {
      path: '/managerCluster',
      name: 'managerCluster',
      component: ManagerCluster,
    }
  ]
}
