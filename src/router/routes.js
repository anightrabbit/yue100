import DetailView from '@/views/DetailView'
import NotFoundView from '@/views/404'
import NewsView from '@/views/NewsView'
import PostView from '@/views/PostView'

const routes = [{
    path: '*',
    name: '404',
    component: NotFoundView,
    title: '未找到'
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: DetailView,
    title: '悦读点详情页'
  },
  {
    path: '/news/:id',
    name: 'News',
    component: NewsView,
    title: '悦读点动态详情页'
  },
  {
    path: '/post/:id',
    name: 'Post',
    component: PostView,
    title: '悦读记详情页'
  }
]

export default routes