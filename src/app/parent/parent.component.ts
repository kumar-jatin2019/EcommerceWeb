import { Component } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent {
  value:string | undefined;
  constructor(){

  }

  public show: boolean = false;
  courses: { id: number; name: string; }[] = [];

  loadCourses() {

    this.courses = [
    {id:1, name:'cour1'},
    {id:2, name:'cour2'},
    {id:3, name:'cour3'}
    ]  
};

trackCourse(index : number, course: any) {
  console.log(course, 'course');
    return course ? course.id : undefined;
};

getValue(val:any){
  this.value = val.value;
  console.log(this.value,  'value');
}
}
