import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RouterModule, Routes} from '@angular/router';
import {MymoduleModule} from '../../../../mymodule/mymodule.module';
import {MymodalModule} from '../../../../mymodal/mymodal.module';
import {CoreModule} from '../../../../core/core.module';
import {MatPaginator} from '@angular/material';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { UsersComponent } from './users.component';
import { UsersService } from './services/users.service';
import { DatakantorService } from '../datakantor/serivces/datakantor.service';


const routes: Routes = [
  {path : '', component: UsersComponent
  }
];

@NgModule({
  imports : [
    CommonModule,
    MymoduleModule,
    RouterModule.forChild(routes),
    MymodalModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    
  ],
  declarations : [
    UsersComponent
  ],
  exports : [
    UsersComponent,
    RouterModule
  ],
  providers : [
    MatPaginator, UsersService , DatakantorService
  ]
})
export class UsersModule {

}
