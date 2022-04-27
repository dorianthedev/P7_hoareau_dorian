import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";
import SignUp from "./views/SignUp.vue";
import Login from "./views/Login.vue";
import All from "./views/All.vue";
import Profil from "./views/Profil.vue";

const routes = [
  {
    name: "Home",
    component: Home,
    path: "/",
  },
  {
    name: "SignUp",
    component: SignUp,
    path: "/signup",
  },
  {
    name: "Login",
    component: Login,
    path: "/login",
  },
  {
    name: "All",
    component: All,
    path: "/all",
  },
  {
    name: "Profil",
    component: Profil,
    path: "/profil",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
