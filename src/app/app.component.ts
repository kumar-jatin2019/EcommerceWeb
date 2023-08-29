import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AgularApp';
  constructor(private router:Router){}
  login(){
  this.router.navigate(["/login"])
  }

//   @HostListener("mouseover",["$event"])
// show(){
//   alert("Hello");
// }
}
