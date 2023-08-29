import { Component, Input , OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent  implements OnInit , OnChanges{
  constructor(){
    console.log("I am constructor")
  }
  
  ngOnInit(): void {
   console.log("I am ngOnit")
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes, 'I am change');
  }
@Input() data:any;
}
