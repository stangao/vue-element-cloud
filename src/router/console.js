/**
 * Created by 军标 on 2017-9-11.
 */
import WebShell from '../pages/console/WebShell.vue'
import WorkBench from '../pages/console/WorkBench.vue'
import ShellDetail from '../pages/console/ShellDetail.vue'
import LogShell from '../pages/console/LogShell.vue'
import LogDetail from '../pages/console/LogDetail.vue'

export default{
  routes: [
    {
      path: '/webShell',
      name: 'webShell',
      component: WebShell,
    },
    {
      path: '/shellDetail/:pod/:token/:container',
      name: 'shellDetail',
      component: ShellDetail,
    },
    {
      path: '/workBench',
      name: 'workBench',
      component: WorkBench,
    },
    {
      path: '/logShell',
      name: 'logShell',
      component: LogShell,
    },
    {
      path: '/logDetail/:pod/:token/:container',
      name: 'logDetail',
      component: LogDetail,
    },

  ]
}
