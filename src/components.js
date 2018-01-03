/**
 * Created by 军标 on 2017-9-11.
 */
import Vue from 'vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.use(ElementUI)

Vue.directive('title', {
  inserted: function (el, binding) {
    console.log("change title"+el.innerText)
    document.title = el.innerText
    el.remove()
  }
})
