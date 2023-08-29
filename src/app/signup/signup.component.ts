import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupArr: any[] = [];

  signupObj: any = {
    username: '',
  }
  signupForm!: FormGroup;
  revenue: any;
  totalRevenuList:any;
  constructor(private fb: FormBuilder,private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      // firstname: ['', Validators.required],
      // lastname: ['', Validators.required],
      // username: ['', Validators.required],
      // email: ['', Validators.required],
      // password: ['', Validators.required],
      revenueGoal:['']
    });
    this.revenue = [
      {Name:'Recurring', Code: 'REC'},
      {Name:'Advisior', Code:'ADV'}
    ]
    this.totalRevenuList=[...this.revenue];
  }

  showDiv(value:any){
    let index=this.totalRevenuList.findIndex((x:any)=>x.Code==value);
    if(index>-1){
      return  this.totalRevenuList[index].showDiv;
    }else{
      return false;
    }
  }

  hideDiv(value:any){
    let index=this.totalRevenuList.findIndex((x:any)=>x.Code==value);
    if(index>-1){
      this.revenue.push(this.totalRevenuList[index]);
      this.totalRevenuList[index].showDiv=false;
      this.signupForm.get('revenueGoal')?.setValue('');
    }
  }

  addProduct(event:any){
    console.log(event.target.value);
    let index=this.totalRevenuList.findIndex((x:any)=>x.Code==event.target.value);
    if(index>-1){
      
      this.totalRevenuList[index].showDiv=true;
    }
    console.log( "totalRevenuList",this.totalRevenuList);
    this.revenue = this.revenue.filter((x:any)=> x.Code !== event.target.value);
    this.signupForm.get('revenueGoal')?.setValue('');
}
  onSubmit() {
    if (this.signupForm.valid) {
      console.log(this.signupForm.value)
      // this.router.navigate(['./home']);
      const username = this.signupForm.value.username;
      const password = this.signupForm.value.password;
      localStorage.setItem('user', username);
      localStorage.setItem('pass', password);
      this.router.navigate(['./login']);
    }
    else {
      console.log("Form is not valid")
      this.validateAllFormFields(this.signupForm);
      alert("Your form is invalid")
    }
  }

  private validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
      }
      else if (control instanceof FormGroup) {
        this.validateAllFormFields(control)
      }
    })
  }
}
