import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { LoaderComponent } from './_http/loader/loader.component';
import {MymoduleModule} from '../mymodule/mymodule.module';
import {LoaderService} from './_http/loader/loader.service';
import {HttpService} from './_http/http.service';
import {RequestOptions, XHRBackend} from '@angular/http';
import {httpServiceFactory} from './_http/http-service.factory';

@NgModule({
  imports : [CommonModule, MymoduleModule],
  declarations : [LoaderComponent],
  exports : [LoaderComponent],
  providers : [
    LoaderService,
    {
      provide: HttpService,
      useFactory: httpServiceFactory,
      deps: [XHRBackend, RequestOptions, LoaderService]
    }
  ]

})
export class CoreModule {}
