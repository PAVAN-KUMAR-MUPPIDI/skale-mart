import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  products: any[] = [];

  constructor(private http: HttpClient,private productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.productService.getProducts().subscribe(data => this.products = data);
  }

  editProduct(id: string) {
    this.router.navigate(['/admin-products/edit', id]);
  }

  addProduct() {
    this.http.get<any[]>('http://localhost:3000/products').subscribe(products => {
      const ids = products.map(p => +p.id);
      const newId = Math.max(...ids) + 1;
      this.router.navigate(['/admin-products/edit', newId]);
    });
  }

}
