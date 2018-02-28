import {Injectable, Output, EventEmitter, Input} from "@angular/core";

@Injectable()
export class ModalService {
  @Output() loaderclass: EventEmitter<any> = new EventEmitter();

  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() {}


    //event emitter

  public modalOpen(): any {
      return this.loaderclass.emit('page-container');
    }
  public modalclose(): any {
      return this.loaderclass.emit('page-container-full');
    }

    getEmittedValue() {
      return this.loaderclass;
    }

}
