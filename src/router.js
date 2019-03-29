import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
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
      path: "/form/:action",
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
