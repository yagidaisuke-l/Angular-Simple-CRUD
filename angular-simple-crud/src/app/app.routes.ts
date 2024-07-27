import { Routes } from '@angular/router';
import { BlogListComponent } from './blog/blog-list/blog-list.component';
import { BlogCreateComponent } from './blog/blog-create/blog-create.component';
import { BlogDetailComponent } from './blog/blog-detail/blog-detail.component';
import { BlogEditComponent } from './blog/blog-edit/blog-edit.component';

// export const routes: Routes = [];

export const routes: Routes = [
  // ルーティング設定をここに追加
  { path: '', component: BlogListComponent },
  { path: 'blog/create', component: BlogCreateComponent },
  { path: 'blog/detail/:id', component: BlogDetailComponent },
  { path: 'blog/edit', component: BlogEditComponent },
];

