import Vue from 'vue'
import App from './App.vue'
import store from './store'

import $ from 'jquery'
import 'bootstrap/dist/js/bootstrap.bundle.min';


Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')


$(function () {
  ($('body') as any).tooltip({
    selector: '.remove-item'
  });
  // ($('[data-toggle="tooltip"]') as any).tooltip();
})