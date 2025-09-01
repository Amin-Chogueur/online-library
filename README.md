# 📚Online library Client App

A modern and responsive Online library application built with **React**, **TypeScript**, and **Tailwind CSS**. This app allows users to browse a curated collection of books, filter by category, search by title, manage their favorites and cart, and place orders with cash-on-delivery. All data is powered by an API provided by the library Admin Panel.

---

## 🚀 Features

- 🔍 **Browse & Search Products**  
  Users can explore the entire collection with:

  - **Category filtering** (server-side)
  - **Title-based search** (server-side)
  - **Server-side pagination** for performance

- ❤️ **Favorites Page**  
  Users can save books to a favorites list so they don’t have to search for them again.

- 🛒 **Cart Functionality**

  - Add products to cart
  - Increase/decrease quantity
  - Remove products
  - Submit orders with a form

- 📦 **Order Placement & Success Page**

  - Users submit orders via a checkout form
  - Order is saved to the admin database
  - On success, the app displays a detailed confirmation page (fetched from admin API)

- 📄 **Product Details Page**  
  Dynamic page showing full details of a selected product.

- ✉️ **Contact Page**  
  Users can send messages to the admin's email using the Resend API.

- 👨‍💼 **About Page**  
  Learn more about the Online library.

- ✅ **Form Validation**

  - All forms (contact, cart) use **React Hook Form** + **Zod** for validation

- 🎨 **Animations**  
  Beautiful transitions and animations using **Framer Motion**

- 📱 **Fully Responsive**  
  Works seamlessly on mobile, tablet, and desktop.

---

## 🛠️ Tech Stack

- **Framework**: React (v19) + TypeScript
- **Styling**: Tailwind CSS
- **Form Handling**: React Hook Form + Zod
- **State Management**: Redux Toolkit + Redux Persist
- **Routing**: React Router DOM
- **Email Service**: Resend
- **Animations**: Framer Motion
- **HTTP Requests**: Axios
- **Icons**: React Icons

---

## 📦 Installation

```bash
git clone https://github.com/your-username/bookstore-client.git
cd bookstore-client
npm install
```

## Running the App Locally

npm run dev

## Environment Variables

VITE_BASE_URL==https://your-admin-api-url.com/api

## Project Structure

src/
│
├── components/ // Reusable UI components
├── pages/ // Main pages (Books, BookDetail, Cart, Contact, etc.)
├── store/ // Redux setup (slices, store)
├── types/ // TypeScript types
├── helpers/ // Utility functions
├── hooks/ // Redux hooks
└── layouts/ // main layout
