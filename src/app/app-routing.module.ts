import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";


const routes: Routes = [
  {
    path: '', loadChildren: '../app/components/auth/auth.module#AuthModule'
  },
  {
    path: 'home', loadChildren: '../app/components/home/home.module#HomeModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
