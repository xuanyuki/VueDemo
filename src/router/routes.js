
const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    component: () => import('@/views/Login'),
    meta: {
      title: '共创云'
    }
  }, {
    path: '/search',
    component: () => import('@/views/Search'),
    meta: {
      title: '资源中心 | 共创云'
    }
  }
];

export default routes;