import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { HttpClient } from '@angular/common/http';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [FooterComponent,NavbarComponent,CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  product: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private http: HttpClient,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductById(id).subscribe(data => {
      this.product = data;
      console.log(this.product,id)
    });
  }


  addToCart(product: any) {
  const url = 'http://localhost:3000/cart';

  // 1. Check if product already exists in cart
  this.http.get<any[]>(`${url}?id=${product.id}`).subscribe(cartItems => {
    if (cartItems.length > 0) {
      // 2. Already exists → update count
      const existingItem = cartItems[0];
      const updatedItem = {
        ...existingItem,
        count: existingItem.count + 1
      };

      this.http.put(`${url}/${existingItem.id}`, updatedItem).subscribe(() => {
        alert(product['name'] + ' count updated in cart!');
      });
    } else {
      // 3. Not exists → add new with count = 1
      const newItem = { ...product, count: 1 };

      this.http.post(url, newItem).subscribe(() => {
        alert(product['name'] + ' added to cart!');
      });
    }
  });
  }

  buyNow(){
    this.router.navigate(['/order-form']);
  }

}

