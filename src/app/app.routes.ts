import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { CartComponent } from './pages/cart/cart.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { OrderFormComponent } from './pages/order-form/order-form.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ProductEditComponent } from './pages/product-edit/product-edit.component';
import { AdminProductsComponent } from './pages/admin-products/admin-products.component';


export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'admin',component:AdminComponent},
    {path:'products',component:ProductsComponent},
    {path:'cart',component:CartComponent},
    {path:'orders',component:OrdersComponent},
    {path:'product/:id',component:ProductDetailComponent},
    {path:'order-form',component:OrderFormComponent},
    {path: 'admin-products', component: AdminProductsComponent },
    {path: 'admin-products/edit/:id', component: ProductEditComponent },
    {path:'**',component:NotFoundComponent},

];
