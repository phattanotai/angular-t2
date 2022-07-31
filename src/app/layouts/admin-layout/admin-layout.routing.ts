import { Routes } from '@angular/router';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';
import { NewsComponent } from 'src/app/pages/news/news.component';

export const AdminLayoutRoutes: Routes = [
  { path: '', component: NewsComponent },
  { path: 'dashboard', component: DashboardComponent },
];
