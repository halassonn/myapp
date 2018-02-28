import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {PenggajianComponent} from "./penggajian.component";
import {MymoduleModule} from "../../../../mymodule/mymodule.module";
import {RouterModule, Routes} from "@angular/router";


const routes:Routes=[
  {path:'',component:PenggajianComponent}
]

@NgModule({
  imports : [CommonModule, MymoduleModule,
  RouterModule.forChild(routes)],
  declarations : [PenggajianComponent],
  exports : [
    RouterModule
  ]
})
export class PenggajianModule{

}
