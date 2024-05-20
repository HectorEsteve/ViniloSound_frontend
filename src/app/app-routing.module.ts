import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicGuard } from './auth/guards/public.guard';
import { AuthGuard } from './auth/guards/auth.guard';
import { AdminGuard } from './auth/guards/admin.guard';
import { RootGuard } from './auth/guards/root.guard';


const routes: Routes = [
  { path: 'home',
    loadComponent: () => import('./home/home.component').then(c => c.HomeComponent)
  },
  { path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate: [ PublicGuard ],
    canMatch: [ PublicGuard ]
  },
  { path: 'user',
    loadChildren: () => import('./auth/user/user.module').then(m => m.UserModule),
    canActivate: [ AuthGuard ],
    canMatch: [ AuthGuard ]
  },
  { path: 'admin',
    loadChildren: () => import('./auth/admin/admin.module').then(m => m.AdminModule),
    canActivate: [ AdminGuard ],
    canMatch: [ AdminGuard ]
  },
  { path: 'root',
    loadChildren: () => import('./auth/root/root.module').then(m => m.RootModule),
    canActivate: [ RootGuard ],
    canMatch: [ RootGuard ]
  },
  { path: 'news',
    loadComponent: () => import('./shared/pages/coming-soon-page/coming-soon-page.component').then(c => c.ComingSoonPageComponent)
  },
  { path: 'store',
    loadComponent: () => import('./shared/pages/coming-soon-page/coming-soon-page.component').then(c => c.ComingSoonPageComponent)
  },
  { path: 'search',
    loadChildren: () => import('./music/music.module').then(m => m.MusicModule)
  },
  { path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  { path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
