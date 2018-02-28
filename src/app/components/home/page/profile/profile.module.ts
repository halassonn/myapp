import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';

import {RouterModule, Routes} from '@angular/router';
import {ProfileComponent} from './profile.component';
import {MymoduleModule} from '../../../../mymodule/mymodule.module';
import {MymodalModule} from '../../../../mymodal/mymodal.module';
import {ImageUploadModule} from 'angular2-image-upload';
import {CoreModule} from '../../../../core/core.module';
import {MatPaginator, DateAdapter, MAT_DATE_FORMATS} from '@angular/material';
import {ProfileService} from './services/profile.service';
import {ReactiveFormsModule} from '@angular/forms';
import { DateFormat, APP_DATE_FORMATS } from '../../../../utils/date-formats';

const routes: Routes = [
  {path : '', component: ProfileComponent
  }
];

@NgModule({
  imports : [
    CommonModule,
    MymoduleModule,
    RouterModule.forChild(routes),
    MymodalModule,
    ImageUploadModule.forRoot(),
    CoreModule,
    ReactiveFormsModule
  ],
  declarations : [
    ProfileComponent
  ],
  exports : [
    ProfileComponent,
    RouterModule
  ],
  providers : [
    MatPaginator, ProfileService,
    { provide: DateAdapter, useClass: DateFormat },
    {
      provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
  }, DatePipe
  ]
})
export class ProfileModule {
  constructor(private dateAdapter: DateAdapter<Date>) {
    // dateAdapter.setLocale('en-in'); // DD/MM/YYYY
   }
}
