/* eslint-disable no-unused-vars */
import Style      from 'assets/scss/style.scss';
import Vue        from 'vue';
import App        from '@/App.vue';

import Checkbox   from '@/components/_checkbox.vue';
import Radio      from '@/components/_radio_btn.vue';
import Select     from '@/components/_select.vue';
import Textfield  from '@/components/_textfield.vue';
import Textarea   from '@/components/_textarea.vue';

Vue.config.productionTip = false;

// Dynamically import and register global components.
Vue.component('v-checkbox', Checkbox);
Vue.component('v-radio', Radio);
Vue.component('v-select', Select);
Vue.component('v-textfield', Textfield);
Vue.component('v-textarea', Textarea);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
});

let trigger = document.querySelector('#trigger');

trigger.addEventListener('click', (event) => { console.log(event); });
