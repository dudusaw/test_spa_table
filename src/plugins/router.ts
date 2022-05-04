import { createRouter, createWebHistory } from "vue-router";
import MainPage from "../pages/MainPage.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    { 
      name: 'home',
      path: '/:pageNum', 
      component: MainPage,
    },
  ]
});