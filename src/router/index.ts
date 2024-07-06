import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// 配置路由
// const routes: RouteRecordRaw[] = [
//   {
//     path: '/',
//     name: 'home',
//     component: () => import('../views/home/index.vue'),
//     meta: {},
//     children: []
//   }
// ]

const about = {
  path: '/about',
  name: 'about',
  component: () => import('@/views/about/index.vue'),
  meta: {},
  children: []
}

const modules: Record<string, any> = import.meta.glob('./modules/*.ts', { 
  eager: true,
});

const routes: RouteRecordRaw[] = [];

Object.keys(modules).forEach((key) => {
  const module = modules[key].default;
  routes.push(module);
});

routes.push(about);

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start();
  next()
})

router.afterEach((to, from) => {
  NProgress.done();
})

export default router;