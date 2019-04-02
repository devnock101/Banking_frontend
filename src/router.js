import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/user",
      name: "user",
      component: () => import("./views/User.vue")
    },
    {
      path: "/create/:action",
      name: "create",
      component: () => import("./views/AppForm.vue")
    },
    {
      path: "/user/account",
      name: "account",
      component: () => import("./views/Account.vue"),
      props: true
    }
  ]
});
