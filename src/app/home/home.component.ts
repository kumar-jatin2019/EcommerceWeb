import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product-service';
import { ProductsInfo } from '../interface/products.interface';
import { CartService } from '../service/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  allproducts = [];
  msg: any;
  public isLoggedIn: boolean = false;
  name: any;
  search:any = ''
  lessons: boolean = true;
  constructor(public product: ProductService, private router: Router, private cartService: CartService) {

  }

  ngOnInit(): any {

    this.name = localStorage.getItem('user');
    this.product.products().subscribe((res: ProductsInfo) => {
      this.allproducts = res.products;
      // this.allproducts = [];
    });

    // To get Search Value //

    this.cartService.getSearchProducts().subscribe((res: any) => {
      this.search = res;

  });

    this.product.loggedIn$.subscribe(
      ((res: boolean) => {
        this.isLoggedIn = res;
        console.log(this.isLoggedIn);
      })
    );

    if (this.name) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }

  }
  addtocart(item: any) {
    if (this.isLoggedIn === true) {
      this.cartService.addtoCart(item);
    }
    else {
      this.router.navigate(['/login'])
    }

  }
}
