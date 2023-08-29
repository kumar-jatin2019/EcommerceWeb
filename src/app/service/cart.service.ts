import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartItemList: any = []
  public productList = new BehaviorSubject<any>([]);
  public countList =  new BehaviorSubject<any>({});
  public totalList = new BehaviorSubject<any>({});
  public searchValue = new BehaviorSubject<any>('');
  newquant: any;
  quant: any = 0;
  quants: any = 0;
  total:any = 0;
  totalcount: any;
  constructor() { }
  getProducts() {
    return this.productList.asObservable();
  }

  getSearchProducts(){
     return this.searchValue.asObservable();
  }
  getCountList(){
    return this.countList.asObservable();
  }

  getTotalCountList(){
    return this.totalList.asObservable();
  }

  setProduct(product: any) {
    this.cartItemList.push(...product);
    this.productList.next(product);
  }
  addtoCart(product: any) {
    let found = false;
    this.cartItemList.forEach((element: any) => {
      if (product.id === element.id) {
        debugger;
        element.quantity++;
        found = true;
        this.quant = this.quant + 1;
        this.total = this.total  + element.total;
        console.log(this.quant, 'when repeated')
        // localStorage.setItem('quant', this.quant);
        this.productList.next(this.cartItemList);
        return;
      }
    });

    if (found === false) {
      debugger;
      product.quantity = 1
      this.cartItemList.push(product);
      this.productList.next(this.cartItemList);
      this.quant = this.quant + product.quantity;
      this.total = this.total + product.total;
     
      
    }
    let count = {quant: this.quant}
    let total = {total: this.total}
    this.getCount(count);
    this.getTotalCounts(total);
    this.getTotalPrice();
  }


  getTotalCounts(totalCount:any){
     this.totalList.next(totalCount);
  }
  getCount(value: any) {
    this.countList.next(value);
  }
  getTotalPrice() {
     let grandTotal = this.total;
    console.log(grandTotal,'grandTotal');
    return grandTotal;
  }
  removeCartItem(product: any) {
    this.cartItemList.map((value: any, index: any) => {
      if (product.id === value.id) {
        value.quantity--;
        this.total = this.total - product.total;
        let total = {total: this.total}
        this.getTotalCounts(total);
        if (value.quantity < 1) {
          this.cartItemList.splice(index, 1);
        }
        this.quant = this.quant -1 ;
        let count = {quant: this.quant}
        this.getCount(count);

      }
    })
  }
  removeAllCart() {
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
    let value  = {}
    this.countList.next(value);
    this.quant = 0;
    this.total = 0;
  }
}
