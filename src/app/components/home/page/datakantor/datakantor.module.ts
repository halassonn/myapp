import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {DatakantorComponent} from "./datakantor.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MymoduleModule} from "../../../../mymodule/mymodule.module";
import {RouterModule, Routes} from "@angular/router";
import {DatakantorService} from "./serivces/datakantor.service";
import {MatPaginator} from "@angular/material";
import {CoreModule} from "../../../../core/core.module";
import { MymodalModule } from "../../../../mymodal/mymodal.module";

const routes:Routes=[
  {path : '',component:DatakantorComponent}
]

@NgModule({
  imports : [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MymoduleModule,
    RouterModule.forChild(routes),
    CoreModule,
    MymodalModule
  ],
  declarations : [
    DatakantorComponent
  ],
  exports: [
    DatakantorComponent,
    FormsModule,
    ReactiveFormsModule,
    MymoduleModule,
    RouterModule,
    CoreModule
  ],
  providers : [
    DatakantorService, MatPaginator
  ]

})

export class DatakantorModule {}
