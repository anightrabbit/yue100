import DetailView from '@/views/DetailView'
import NotFoundView from '@/views/404'
import NewsView from '@/views/NewsView'

const routes = [{
    path: '*',
    name: '404',
    component: NotFoundView,
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: DetailView
  },
  {
    path: '/news/:id',
    name: 'News',
    component: NewsView
  }
]

export default routes