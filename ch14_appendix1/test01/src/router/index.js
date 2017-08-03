import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import CheckboxLabel from '@/components/CheckboxLabel'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/checkbox',
      name: 'CheckboxLabel',
      component: CheckboxLabel
    }
  ]
})
