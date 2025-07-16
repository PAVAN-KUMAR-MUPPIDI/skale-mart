// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ActivatedRoute, Router, RouterModule } from '@angular/router';
// import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-product-edit',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule, RouterModule],
//   templateUrl: './product-edit.component.html',
//   styleUrls: ['./product-edit.component.css']
// })
// export class ProductEditComponent implements OnInit {
//   isNew = false;
//   productForm!: FormGroup;

//   constructor(
//     private fb: FormBuilder,
//     private route: ActivatedRoute,
//     private http: HttpClient,
//     public router: Router
//   ) {}

//   ngOnInit(): void {
//     // Create the form after fb is initialized
//     this.productForm = this.fb.group({
//       id: [''],
//       name: ['', Validators.required],
//       price: ['', Validators.required],
//       offer: [''],
//       rating: ['', Validators.required],
//       userType: ['', Validators.required],
//       category: ['', Validators.required],
//       image: ['', Validators.required],
//       other: [''],
//       description: ['']
//     });

//     const id = this.route.snapshot.paramMap.get('id');
//     if (id) {
//       this.http.get<any>(`http://localhost:3000/products/${id}`).subscribe(product => {
//         this.productForm.patchValue(product);
//       });
//     }
//   }

//   save() {
//     if (this.productForm.invalid) return;

//     const product = this.productForm.value;
//     this.http.put(`http://localhost:3000/products/${product.id}`, product).subscribe(() => {
//       this.router.navigate(['/admin-products']);
//     });
//   }
// }


import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  productForm!: FormGroup;
  isNew = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
    public router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    // Initialize form after FormBuilder (fb) is available
    this.productForm = this.fb.group({
      id: [id || ''],
      name: ['', Validators.required],
      price: ['', Validators.required],
      offer: ['', Validators.required],
      rating: ['', Validators.required],
      userType: ['', Validators.required],
      category: ['', Validators.required],
      image: ['', Validators.required],
      other: ['', Validators.required],
      description: ['', Validators.required]
    });

    // If product exists, patch the form with its data (editing)
    this.http.get<any>(`http://localhost:3000/products/${id}`).subscribe({
      next: (product) => {
        this.productForm.patchValue(product);
        this.isNew = false;
      },
      error: () => {
        // If not found in DB, treat it as a new product
        this.productForm.patchValue({ id });
        this.isNew = true;
      }
    });
  }

  save() {
    if (this.productForm.invalid){
      alert("Fill all details of Product in fields")
      return;
    }

    const product = this.productForm.value;

    if (this.isNew) {
      this.http.post(`http://localhost:3000/products`, product).subscribe(() => {
        this.router.navigate(['/admin-products']);
        alert(product['name']+" product is added");
      });
    } else {
      this.http.put(`http://localhost:3000/products/${product.id}`, product).subscribe(() => {
        this.router.navigate(['/admin-products']);
      });
    }
  }
}
