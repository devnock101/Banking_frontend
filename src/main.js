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

Vue.axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;
// Vue.axios.defaults.headers.common = {
//   "X-Requested-With": "XMLHttpRequest",
//   "X-CSRFToken": "c4f7472f-75b1-4a37-a84b-e783a04b7515"
// };
// Vue.axios.defaults.headers.post["xsrfCookieName"] = "csrftoken";
// Vue.axios.defaults.headers.post["xsrfHeaderName"] = "X-CSRFToken";
// Vue.axios.defaults.headers.post["responseType"] = "json";
// Vue.axios.defaults.headers.post["Content-Type"] =
//   "application/x-www-form-urlencoded";
// export default Vue.axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
