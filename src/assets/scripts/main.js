// The Vue build version to load with the `import` command
import Style      from 'assets/scss/style.scss';
import Vue        from 'vue';
import App        from '@/App.vue';
import Router     from '@/router/router.js';
import Store      from '@/store/store.js';

Vue.config.productionTip = false;

// Dynamically import and register global components.
Vue.component('v-checkbox', () => import(/* webpackChunkName: "component-checkbox" */ '@/components/_checkbox.vue'));
Vue.component('v-radio', () => import(/* webpackChunkName: "component-radio" */ '@/components/_radio_btn.vue'));
Vue.component('v-select', () => import(/* webpackChunkName: "component-select" */ '@/components/_select.vue'));
Vue.component('v-textfield', () => import(/* webpackChunkName: "component-textfield" */ '@/components/_textfield.vue'));
Vue.component('v-textarea', () => import(/* webpackChunkName: "component-textarea" */ '@/components/_textarea.vue'));

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: Router,
  store: Store,
  render: h => h(App)
});
