import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.component').then(c => c.HomeComponent)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'news',
    loadComponent: () => import('./shared/pages/coming-soon-page/coming-soon-page.component').then(c => c.ComingSoonPageComponent)
  },
  {
    path: 'store',
    loadComponent: () => import('./shared/pages/coming-soon-page/coming-soon-page.component').then(c => c.ComingSoonPageComponent)
  },
  {
    path: 'search',
    loadChildren: () => import('./music/music.module').then(m => m.MusicModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
