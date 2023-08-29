import { Component,OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-addcart',
  templateUrl: './addcart.component.html',
  styleUrls: ['./addcart.component.css']
})
export class AddcartComponent implements OnInit  {
  public productList : any = [];
  public grandTotal !: number;
  constructor(private cartService : CartService){}


  ngOnInit(): void {
     // Get All Products
    this.cartService.getProducts()
    .subscribe(res=>{
      this.productList = res;
      this.grandTotal = this.cartService.getTotalPrice();
    })

     // Get Total Count 
    this.cartService.getTotalCountList()
    .subscribe(res=>{
      this.grandTotal = res.total;
      console.log(this.grandTotal, 'grandTotal');
    })
  }


  removeItem(item: any){
    this.cartService.removeCartItem(item);
  }
  emptycart(){
    this.cartService.removeAllCart();
  }

  addtocart(item: any) {
      this.cartService.addtoCart(item);
  
  }

}
