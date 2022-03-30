import DetailView from '@/views/DetailView'
import NotFoundView from '@/views/404'

const routes = [{
    path: '*',
    name: '404',
    component: NotFoundView,
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: DetailView
  }
]

export default routes