// Set up jQuery
window.$ = window.jQuery = require('jquery');

import Vue from 'vue'
import App from './App.vue'

// Set up config
const vueConfig = require('vue-config')
Vue.use(vueConfig, require('./config.js'))

require('bootstrap-sass')

// Vue resource
Vue.use(require('vue-resource'));

new Vue({
  el: '#app',
  render: h => h(App)
})
