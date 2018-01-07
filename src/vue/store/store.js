/**
 *  store.js
 *  =========
 *  Manage application-wide state.
 *
 */

import Vue from 'vue';
import Vuex from 'vuex';
import Es6Promise from 'es6-promise';

// Promise polyfill for IE11 & Edge
Es6Promise.polyfill();

// Instantiate the Store
Vue.use(Vuex);

const Store = new Vuex.Store({

  state: {

    app: {
      loaded: false
    },

    page: {
      title: ''
    }
  },

  mutations: {

    SET_PAGE_TITLE: function(state, titleSuffix) {
      let pageTitle = process.env.CONFIG.appname || '';
      let pageTitleSeparator = (pageTitle) ? ' | ' : '';
      let pageTitleSuffix = (titleSuffix !== undefined) ? pageTitleSeparator + titleSuffix : '';
      
      state.page.title = `${pageTitle + pageTitleSuffix}`;
    },

    SET_APP_LOADED_STATE: function(state, isAppLoaded) {
      state.app.loaded = (state.app.loaded === false && isAppLoaded === true) ? true : false;
    }

  },

  actions: {

    setPageTitle: function(store, titleSuffix) {
      let commit = store.commit;
      commit('SET_PAGE_TITLE', titleSuffix);
    },

    setAppLoadedState: function(store, isAppLoaded) {
      let commit = store.commit;
      commit('SET_APP_LOADED_STATE', isAppLoaded);
    }

  },

  getters: {
    pageTitle: state => state.page.title,
    appLoaded: state => state.app.loaded
  }

});

export default Store;