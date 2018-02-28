import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-mymodal',
  templateUrl: './mymodal.component.html',
  styleUrls: ['./mymodal.component.scss'],
  animations: [
    trigger('dialog', [
      transition('void => *', [
        style({transform: 'scale3d(.3, .3, .3)'}),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({transform: 'scale3d(.0, .0, .0)'}))
      ])
    ])
  ]
})
export class MymodalComponent implements OnInit {
  @Input() closable = true;
  @Input() visiblekah: boolean;
  @Input() data:string;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() dataout: EventEmitter<string> = new EventEmitter<string>();
  @Input() title: string;
  @Input() mclass: string = 'cmodal';

  constructor() { }

  ngOnInit() {
  }

}
