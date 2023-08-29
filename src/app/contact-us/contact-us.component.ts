import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product-service';
import { ProductsInfo } from '../interface/products.interface';
import { CartService } from '../service/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
  allproducts: any = [];
  msg: any;
  public isLoggedIn: boolean = false;
  constructor(public product: ProductService, private router: Router, private cartService: CartService) {

  }

  ngOnInit(): any {

    this.product.products().subscribe((res: ProductsInfo) => {
      console.log("data", res);
      this.allproducts = res.products;
      console.log(this.allproducts, 'products');
      this.allproducts.forEach((value: any) => {
        Object.assign(value, { quantity: 1, total: value.price });
      });
    });

    this.product.loggedIn$.subscribe(
      ((res: boolean) => {
        console.log(res, 'res');
        this.isLoggedIn = res;
        console.log(this.isLoggedIn);
      })
    );
  }
  addtocart(item: any) {
    debugger;
    if (this.isLoggedIn === true) {
      this.router.navigate(['/addtocart'])
      this.cartService.addtoCart(item);
    }
    else {
      this.router.navigate(['/login'])
    }

  }

}
