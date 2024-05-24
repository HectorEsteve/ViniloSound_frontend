import { CommonModule }         from '@angular/common';
import { NgModule }             from '@angular/core';
import { ReactiveFormsModule }  from '@angular/forms';

import { AuthRoutingModule }        from './auth-routing.module';
import { AuthLayoutPageComponent }  from './pages/layout/layout-page.component';
import { LoginPageComponent }       from './pages/login/login-page.component';
import { RegisterPageComponent }    from './pages/register/register-page.component';

@NgModule({
  declarations: [
    AuthLayoutPageComponent,
    LoginPageComponent,
    RegisterPageComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,

  ],
})
export class AuthModule {}
