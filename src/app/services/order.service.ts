import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class OrderService {
  private ordersUrl = 'http://localhost:3000/orders';
  constructor(private http:HttpClient) { }

  getOrders():Observable<any[]>{
    return this.http.get<any[]>(this.ordersUrl);
  }
}
