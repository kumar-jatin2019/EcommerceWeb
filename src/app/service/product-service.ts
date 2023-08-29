import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductsInfo } from '../interface/products.interface';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url = "https://dummyjson.com/products";
  constructor(private http: HttpClient) { }
  updateMessage = new Subject<any>();
  private loggedIn = new BehaviorSubject<boolean>(false);
  public loggedIn$ = this.loggedIn.asObservable();



  login() {
    this.loggedIn.next(true);
  }

  logout() {
    this.loggedIn.next(false);
  }
  products(): Observable<ProductsInfo> {
    return this.http
      .get<ProductsInfo>(this.url)
      .pipe(retry(1), catchError(this.handleError));
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}


