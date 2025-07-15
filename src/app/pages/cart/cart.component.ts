import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { Router } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FooterComponent,NavbarComponent, NgFor, NgIf],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  readonly cartUrl = 'http://localhost:3000/cart';

  constructor(private http: HttpClient,
              private router: Router,  
  ) {}

  ngOnInit(): void {
    this.getCartItems();
  }

  getCartItems(): void {
    this.http.get<any[]>(this.cartUrl).subscribe(data => {
      this.cartItems = data;
    });
  }

  removeFromCart(id: number): void {
    this.http.delete(`${this.cartUrl}/${id}`).subscribe(() => {
      this.cartItems = this.cartItems.filter(item => item.id !== id);
    });
  }

  increaseCount(item: any): void {
    const updatedItem = { ...item, count: item.count + 1 };
    this.http.put(`${this.cartUrl}/${item.id}`, updatedItem).subscribe(() => {
      this.getCartItems();
    });
  }

  decreaseCount(item: any): void {
    if (item.count <= 1) {
      this.removeFromCart(item.id);
    } else {
      const updatedItem = { ...item, count: item.count - 1 };
      this.http.put(`${this.cartUrl}/${item.id}`, updatedItem).subscribe(() => {
        this.getCartItems();
      });
    }
  }

  buyNow(){ 
    this.router.navigate(['/order-form']);
  }
}
