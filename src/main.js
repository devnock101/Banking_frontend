import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import axios from "axios";
import VueAxios from "vue-axios";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

Vue.prototype.$axios = axios;

require("process");
Vue.use(VueAxios, axios);
Vue.use(BootstrapVue);

Vue.axios.defaults.withCredentials = true;
Vue.axios.defaults.crossDomain = true;
Vue.axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
Vue.axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
Vue.axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");