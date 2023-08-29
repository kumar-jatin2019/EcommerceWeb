import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { AddcartComponent } from './addcart/addcart.component';
import { AuthGuard } from './auth/auth.guard';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { ParentComponent } from './parent/parent.component';
import { ChildComponent } from './child/child.component';

const routes: Routes = [
  {
    path:"parent",component:ParentComponent
  },
  {
    path:"child",component:ChildComponent
  },

//   {
// path:'',redirectTo:'signup',pathMatch:'full'
//   },
  {
    path:"login",component:LoginComponent
  },
  {
    path:"signup",component:SignupComponent
  },
  {
    path:"" , component:HomeComponent
  },
  {
  path:"aboutUs",component:AboutUsComponent
  },
  {
    path:"contactUs",canActivate:[AuthGuard],component:ContactUsComponent
  },
  
  {
    path:"testimonial",canActivate:[AuthGuard],component:TestimonialComponent
  },
  {
    path:"addtocart",canActivate:[AuthGuard],component:AddcartComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
