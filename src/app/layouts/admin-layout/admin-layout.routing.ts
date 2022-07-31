import { Routes } from '@angular/router';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';
import { NewsComponent } from 'src/app/pages/news/news.component';

export const AdminLayoutRoutes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../../pages/news/news.module').then((m) => m.NewsModule),
  },
  {
    path: 'news',
    loadChildren: () =>
      import('../../pages/news/news.module').then((m) => m.NewsModule),
  },
  // { path: '', component: NewsComponent },
  // { path: 'news', component: NewsComponent },
  { path: 'dashboard', component: DashboardComponent },
];
