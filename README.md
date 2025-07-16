# 🛒 SkaleMart – Angular E-Commerce Web Application

SkaleMart is a fully responsive, single-page e-commerce web app built using **Angular v20** and **JSON Server**. It provides a complete user experience for browsing and purchasing products and an admin interface for product and order management.

---

## 📖 Project Overview

SkaleMart simulates a real-world e-commerce platform with key features including:

- Product catalog with filtering by rating, category, and userType (Men/Women/Child)
- Product detail pages with descriptions and images
- Shopping cart with quantity and price management
- Order placement with customer information
- Admin panel to view customer orders
- Admin product manager to add, edit, or remove products
- Clean, responsive UI using Bootstrap and FontAwesome
- JSON Server backend for simulating REST API

---

## 📥 Installation Instructions

### 📦 Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Angular CLI](https://angular.io/cli)  
  Install using:
  ```bash
  npm install -g @angular/cli
  ```
- [Visual Studio Code](https://code.visualstudio.com/) (recommended)

---

### 🔧 Setup Instructions

```bash
# Step 1: Clone the repository
git clone https://github.com/PAVAN-KUMAR-MUPPIDI/skale-mart.git
cd skale-mart

# Step 2: Install dependencies
npm install

# Step 3: Start JSON Server (runs on http://localhost:3000)
npx json-server --watch db.json

# Step 4: Start Angular app (runs on http://localhost:4200)
ng serve
```

---

### ⚙️ Folder Structure Highlights

```
src/
├── app/
│   ├── pages/
│   │   ├── home/
│   │   ├── cart/
│   │   ├── admin/
│   │   ├── admin-products/
│   │   ├── product-edit/
│   │   ├── ...
│   ├── services/
│   │   ├── product.service.ts
│   │   ├── order.service.ts
```

---

## 🧪 Usage Guide

### 🛍️ User Flow
- Navigate to `/` to see homepage with product filters
- Click on any product to view its details
- Add to cart and proceed to checkout
- Fill in customer details and place the order

### 🔐 Admin Flow
- Visit `/admin` to view orders in table format
- Click "Show Products" to go to `/admin-products`
- Edit or add new products from this dashboard
- Editing opens a pre-filled form, adding opens a blank form with auto-generated ID

---

## 🔧 Tech Stack

| Layer       | Tech Used                      |
|-------------|-------------------------------|
| Frontend    | Angular v20                   |
| Backend     | JSON Server (REST API mock)   |
| Styling     | Bootstrap 5, FontAwesome      |
| Forms       | Reactive Forms                |
| Routing     | Angular Router                |
| HTTP        | Angular HttpClient            |
| UI Icons    | FontAwesome                   |
| Dev Tools   | VS Code, Git, GitHub          |

---

## 👨‍💻 Author

**Pavan Kumar Muppidi**  
📧 Email: muppydipavankumar@gmail.com  
🔗 GitHub: [@PAVAN-KUMAR-MUPPIDI](https://github.com/PAVAN-KUMAR-MUPPIDI)

---

## 📄 License

This project is licensed under the **MIT License**.  
Feel free to use, modify, and distribute this project with attribution.

---

## 🖼️ Screenshots / Demo (Optional)

> You can upload and add screenshots or a demo video here.  
> Example:
> ![Home Page](screenshots/homepage.png)
> ![Admin Page](screenshots/admin-products.png)

---

## ✅ Extra Notes

- All components created using Angular Standalone API
- Responsive UI using Bootstrap Grid System
- Product management supports full CRUD
- Order management stores customer info and cart details
- Edit/Add form ensures validation for required fields
- Easily deployable to Vercel or Netlify (Angular build)

---

### 🚀 Happy Coding & Shopping with SkaleMart!
