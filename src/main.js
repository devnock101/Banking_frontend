import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import axios from "axios";
import VueAxios from "vue-axios";
import VueSession from "vue-session";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

require("process");
Vue.use(VueAxios, axios);
Vue.use(VueSession);
Vue.use(BootstrapVue);

Vue.axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;
Vue.axios.defaults.withCredentials = true;
export default Vue.axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
