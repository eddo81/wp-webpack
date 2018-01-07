/**
 *  router.js
 *  =========
 *  Configure client-side routing for the application.
 *
 */

import Vue from 'vue';
import VueRouter from 'vue-router';
import Store from '@/store/store.js';

const Home = () => import(/* webpackChunkName: "home-route" */ '@/views/Home');

// Instantiate the Router
Vue.use(VueRouter);

const Router = new VueRouter({
  linkActiveClass: 'routerlink--active',
  routes: [
    { path: '/', name: 'Home', component: Home, meta: { title: 'Home' } },
    { path: '*', redirect: '/' }
  ]
});

//Router Hooks on Router Enter.
Router.beforeEach((to, from, next) => {
  // Navigate to top of window on route change.
  window.scrollTo(0, 0);
  next();
});

// Router Hooks on Router Leave.
Router.afterEach(route => {
  // Set Page Title.
  Store.dispatch('setPageTitle', route.meta.title);
  document.title = Store.getters.pageTitle;
});

export default Router;
