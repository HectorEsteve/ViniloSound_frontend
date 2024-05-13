import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthLayoutPageComponent } from "./pages/layout/layout-page.component";
import { LoginPageComponent } from "./pages/login/login-page.component";
import { RegisterPageComponent } from "./pages/register/register-page.component";


const routes: Routes = [
  {
    path: '',
    component: AuthLayoutPageComponent,
    children: [
      { path: 'login', component: LoginPageComponent },
      { path: 'register', component: RegisterPageComponent },
      //{ path: '**', redirectTo: 'login' },
    ]
  }
];




@NgModule({
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ],
})
export class AuthRoutingModule { }
