import LoginPage from "@/components/LoginPage";
import {createRouter, createWebHistory} from "vue-router";
import RoomPage from "@/components/RoomPage";

const routes = [
  { path: '/', component: LoginPage },
  { path: '/room', component: RoomPage },
]


const router = createRouter({
  history: createWebHistory(),
  routes,
});

export {router};
