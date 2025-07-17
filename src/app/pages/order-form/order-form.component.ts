import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,FooterComponent, NavbarComponent],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.css'
})
export class OrderFormComponent implements OnInit {
  orderForm!: FormGroup;
  touchedFields: { [key: string]: boolean } = {};
  cartItems: any[] = [];
  selectedItems: any[] = [];
  totalAmount: number = 0;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.orderForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: [''], // Optional
      address: ['', Validators.required],
      pincode: ['', Validators.required]
    });

    this.http.get<any[]>('http://localhost:3000/cart').subscribe(data => {
      this.cartItems = data;
    });
  }

  onBlur(field: string): void {
    this.touchedFields[field] = true;
  }

  toggleItem(item: any, event: any) {
    if (event.target.checked) {
      this.selectedItems.push(item);
      this.totalAmount += item.price * item.count;
    } else {
      this.selectedItems = this.selectedItems.filter(i => i.id !== item.id);
      this.totalAmount -= item.price * item.count;
    }
  }

  submitOrder() {
    if (this.orderForm.invalid) {
      alert('Please fill all required fields correctly.');
      return;
    }

    if (this.totalAmount <= 0) {
      alert('Please select at least one item to order.');
      return;
    }

    if (confirm('Confirm payment of ₹' + this.totalAmount + '?')) {
      const now = new Date()
      const deliveryDate = new Date(now.getTime() + (5 * 24 * 60 * 60 * 1000));
      const order = {
        user: this.orderForm.value,
        items: this.selectedItems,
        total: this.totalAmount,
        date: now,
        deliveryDate: deliveryDate,
        delivered: false
      };

      this.http.post('http://localhost:3000/orders', order).subscribe(() => {
        alert('Order placed successfully!');
        this.router.navigate(['/orders']);
      });
    }
  }
}
