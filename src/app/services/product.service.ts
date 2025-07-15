import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  private apiUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  // get all products for home page
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  // Product services for product-details using id
  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/products/${id}`);
  }

}

