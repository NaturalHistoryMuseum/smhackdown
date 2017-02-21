import Vue from 'vue'
import App from './App.vue'

// Set up config
const vueConfig = require('vue-config')
Vue.use(vueConfig, require('./config.js'))

// Components
import Index from './components/Index.vue'
import Choice from './components/Choice.vue'
import TopTen from './components/TopTen.vue'

var VueRouter = require('vue-router');
Vue.use(VueRouter)
var router = new VueRouter({
    history: true,
    routes: [
        { path: '/', component: Index, name: 'index' },
        { path: '/choice', component: Choice, name: 'choice' },
        { path: '/top-ten', component: TopTen, name: 'topten' },        
    ]    
});


new Vue({
    el: '#app',
    router: router,
    components: {
      Index,
      Choice,
      TopTen
    }  
})
