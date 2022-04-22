import DetailView from "@/views/DetailView";
import NotFoundView from "@/views/404";
import NewsView from "@/views/NewsView";
import PostView from "@/views/PostView";
import LineView from "@/views/LineView.vue";
import UploadImg from "@/views/UploadImg";
import PostListView from "@/views/PostListView";

const routes = [
  {
    path: "*",
    name: "404",
    component: NotFoundView,
    title: "未找到",
  },
  {
    path: "/detail/:id",
    name: "Detail",
    component: DetailView,
    title: "悦读点详情页",
  },
  {
    path: "/news/:id",
    name: "News",
    component: NewsView,
    title: "悦读点动态详情页",
  },
  {
    path: "/post/:id",
    name: "Post",
    component: PostView,
    title: "悦读记详情页",
  },
  {
    path: "/line/:id",
    name: "Line",
    component: LineView,
    title: "线路打卡",
  },
  {
    path: "/uploadImg",
    name: "uploadImg",
    component: UploadImg,
    title: "选择壁纸",
  },
  {
    path: "/post",
    name: "PostList",
    component: PostListView,
    title: "悦读记列表",
  },
];

export default routes;
