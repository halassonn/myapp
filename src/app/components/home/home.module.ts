import {NgModule} from "@angular/core";
import {HomeComponent} from "./home.component";
import {CommonModule} from "@angular/common";
import {MymoduleModule} from "../../mymodule/mymodule.module";
import {RouterModule, Routes} from "@angular/router";
import {LoaderService} from "../../core/_http/loader/loader.service";
import { UsersComponent } from './page/users/users.component';


const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      {path: 'profile', loadChildren: '../../components/home/page/profile/profile.module#ProfileModule'},
      {path: 'penggajian', loadChildren: '../../components/home/page/penggajian/penggajian.module#PenggajianModule'},
      {path: 'datakantor', loadChildren: '../../components/home/page/datakantor/datakantor.module#DatakantorModule'},
      {path: 'users', loadChildren: '../../components/home/page/users/users.module#UsersModule'}
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    MymoduleModule, RouterModule.forChild(routes)
  ],
  declarations: [
    HomeComponent,
  ],
  exports: [
    RouterModule
  ], providers: [
    LoaderService
  ]
})
export class HomeModule {

}
