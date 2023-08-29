import { Component, OnDestroy, OnInit } from '@angular/core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/service/product-service';
import { CartService } from 'src/app/service/cart.service';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit , OnDestroy{
  cartIcon = faShoppingCart;
  name: any;
  public unsubscribe = new Subject<any>();
  search:any;
  loginUserName: boolean = false;
  login:boolean = false;
  count:any;
  list:any;
  constructor(private router: Router, private product:ProductService, private cartService:CartService) {
  }
  
  ngOnInit(): void {
    this.cartService.cartItemList
     this.cartService.getCountList().subscribe((res:any)=>{
       this.count = res.quant;
       console.log(this.count, 'res');
    });
    this.name = localStorage.getItem('user');
    if (this.name) {
      this.loginUserName = true;
      this.login = false;
    } else {
      this.loginUserName = false;
      this.login = true;
    }

  }



  checkResult(event:any){
   let value  = event.target.value;
   this.cartService.searchValue.next(value);
    console.log(event.target.value, 'value from header');
  }
  logout() {
    localStorage.removeItem('user');
    this.product.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.unsubscribe.next(true);
    this.unsubscribe.complete();
  }

}
