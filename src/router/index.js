// index.js
import { createRouter, createWebHistory } from 'vue-router';
import Todos from '../components/kegiatan.vue'; // Impor komponen Todos
import Post from '../components/Post.vue'; // Impor komponen Post
import Photos from '../components/Photos.vue'; // Impor komponen Photos
import PhotoDetail from '../components/PhotoDetail.vue';
const routes = [
  {
    path: '/',
    redirect: '/todos'
  },
  { path: '/photos/:id', component: PhotoDetail, props: true },
  {
    path: '/todos',
    component: Todos
  },
  {
    path: '/posts',
    component: Post // Mengarahkan /posts ke komponen Post
  },
  {
    path: '/photos',
    component: Photos
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
