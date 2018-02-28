import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from './auth.component';
import { LoginComponent } from './login/login.component';
import {MymoduleModule} from '../../mymodule/mymodule.module';
import {AuthService} from './auth_providers/auth.services';
import {CoreModule} from '../../core/core.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

const routes: Routes = [
  {
    path: '', component: AuthComponent,
    children : [
      {path : '', component: LoginComponent}
    ]
  }
];

@NgModule({
  imports : [
    CommonModule,
    RouterModule.forChild(routes),
    MymoduleModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations : [AuthComponent, LoginComponent],
  exports : [
    RouterModule,
    CoreModule
  ],
  providers : [
    AuthService,
  ]
})
export class AuthModule {}
