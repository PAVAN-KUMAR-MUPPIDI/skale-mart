import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [NavbarComponent,FooterComponent, CommonModule, NgIf, NgFor],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];

  constructor(private http: HttpClient) {}

  // ngOnInit(): void {
  //   this.http.get<any[]>('http://localhost:3000/orders').subscribe(data => {
  //     this.orders = data;
  //   });
  // }

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders(): void {
    this.http.get<any[]>('http://localhost:3000/orders').subscribe(data => {
      this.orders = data;
    });
  }

  markAsDelivered(order: any): void {
    const confirmed = window.confirm("Are you sure you want to mark this order as delivered?");

    if (confirmed) {
      const updatedOrder = { ...order, delivered: true };

      this.http.put(`http://localhost:3000/orders/${order.id}`, updatedOrder)
        .subscribe(() => {
          order.delivered = true;  // Update UI instantly
        });
    }
  }


}
