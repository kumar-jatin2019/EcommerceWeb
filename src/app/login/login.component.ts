import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../service/product-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginObj: any = {
    email: '',
    password: ''
  };
  public isLogin: boolean = false;
  loginForm!: FormGroup; //declare to login forms by giving the type formgroup
  constructor(private fb: FormBuilder, private router: Router, private product: ProductService) { }//inject formbuilder

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value)

      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;

      if (username && password) {
        this.product.login();
        localStorage.setItem('user', username);
        this.router.navigate(['/']);
      }
      else {
        alert("invalid credetials")
      }
      // if(username === localStorage.getItem('user') && password === localStorage.getItem('pass')){
      //   this.router.navigate(['./home']);
      // }
      // else{
      //   alert("invalid credetials")
      // }


    }
    else {
      console.log("Form is not valid")
      this.validateAllFormFields(this.loginForm);

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
