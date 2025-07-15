
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ProductService } from '../../services/product.service';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink,RouterOutlet,CommonModule, FormsModule, NavbarComponent, FooterComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  allProducts: any[] = [];
  displayProducts: any[] = [];

  // Filters
  userTypeFilter = { men: false, women: false, child: false };
  searchText = '';
  selectedRating = 0;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe(data => {
      this.allProducts = data;
      this.displayProducts = [...this.allProducts];
    });
  }

  // Apply all filters
  applyFilters() {
    this.displayProducts = this.allProducts.filter(p => {
      // UserType filter
      const types = Object.entries(this.userTypeFilter)
        .filter(([_, v]) => v)
        .map(([k]) => k);
      if (types.length && !types.includes(p.userType)) return false;

      // Search filter
      const term = this.searchText.trim().toLowerCase();
      if (term) {
        const match =
          p.name.toLowerCase().includes(term) ||
          p.category.toLowerCase().includes(term);
        if (!match) return false;
      }

      // Rating filter
      if (this.selectedRating > 0) {
        if (!(p.rating >= this.selectedRating && p.rating < this.selectedRating + 1)) return false;
      }

      return true;
    });
  }

  onCheckboxChange() {
    this.applyFilters();
  }

  onSearch() {
    this.applyFilters();
  }

  onStarClick(num: number) {
    this.selectedRating = num;
    this.applyFilters();
  }

  clearFilters() {
    this.userTypeFilter = { men: false, women: false, child: false };
    this.searchText = '';
    this.selectedRating = 0;
    this.applyFilters();
  }
}
