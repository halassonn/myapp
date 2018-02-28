import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MymodalComponent} from "./mymodal.component";

@NgModule({
  imports:[CommonModule],
  declarations:[MymodalComponent],
  exports:[MymodalComponent]
})
export class MymodalModule{

}
