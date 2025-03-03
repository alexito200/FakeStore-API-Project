<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li>
      <a href="#usage">Usage</a>
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#login">Login</a></li>
        <li><a href="#register">Register</a></li>
        <li><a href="#user-profile">User Profile</a></li>
        <li><a href="#order-history">Order History</a></li>
        <li><a href="#order-confirmation">Order Confirmation</a></li>
        <li><a href="#add-product">Add Product</a></li>
        <li><a href="#update-product">Update Product</a></li>
        <li><a href="#product-card">Product Card</a></li>
        <li><a href="#shopping-cart">Shopping Cart</a></li>
        <li><a href="#cart-slice">Cart Slice</a></li>
        <li><a href="#store">Store</a></li>
        <li><a href="#types">Types</a></li>
        <li><a href="#auth-context">Auth Context</a></li>
        <li><a href="#auth-provider">Auth Provider</a></li>
        <li><a href="#app">App</a></li>
        <li><a href="#main">Main</a></li>
        <li><a href="#firebase-config">Firebase Config</a></li>
        <li><a href="#cicd-pipeline">CI/CD Pipeline</a></li>
      </ul>
    </li>
</details>

<!-- LIVE PROJECT LINK -->
## Live Project

You can access the live project here: **[Live Demo](fake-store-api-project-omega.vercel.app)**

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/alexito200/FakeStore-API-Project
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Change git remote url to avoid accidental pushes to base project
   ```sh
   git remote set-url origin github_username/repo_name
   git remote -v # confirm the changes
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

This section will give an explanation of the inner workings of the app
### Home
This code creates a homepage for our E-Commerce Store utilizing React, TypeScript, and Redux. It fetches product and category data from an API and displays them on the page. Users can
filter products by category and add items to their shopping cart. The cart data is stored in the browser's session storage, so items remain even if the page is refreshed. A shopping
cart icon at the top shows the total number of items in the cart, and users can click on it to go to the cart page. If data is still loading, a message is shown, and if there's an
error, it displays an error message.

### Login
This code allows users to log in and log out using their email and password with Firebase authentication. When a user logs in, their profile data is retrieved, stored in Redux and local storage, and they are redirected to their profile page.

### Register
This code creates a registration form where users can sign up with their full name, email, and password. When they submit the form, it saves their account in Firebase and stores their profile information before redirecting them back to the login page.

### User Profile
This code shows a user's profile and lets them update their name and address. It also allows the user to delete their account, log out, or go to other pages like shopping or order history. If the user is not signed in, an error message appears.

### Order History
This code shows a user's past orders. If the user is not logged in, it tells them to log in and provides a button to go to the login page. If the user has no orders, it shows a message, but if they do, it lists each order with details like total price, status, and items purchased.

### Order Confirmation
This code shows the order details after a user checks out. It gets order information from the previous page and displays the total items, total price, and product details. The user can go back to shopping or clear their cart and return to the home page.

### Add Product
This code creates a page where users can add a new product by entering its name, price, image URL, and category. When the "Add Product" button is clicked, it checks if all fields are filled, then saves the product and redirects the user to the home page.

### Update Product
This code lets users update or delete a product in an online store. It loads the product's details from Firestore, allows users to change the name, price, image, or category, and saves the updates. If the user chooses, they can also delete the product from the database.

### Product Card
This code uses the fetched data from Product to display the image, title, price, and a button with an onClick event. The button is used to add the product to the cart.

### Shopping Cart
This code displays the items in the user's shopping cart where they can see the total number of items and their total price. It saves the cart data in session storage whenever the cart
updates. Users can remove items from the cart, and if they proceed to checkout, the cart is cleared, and they are redirected to the homepage. The component also allows users to continue shopping by navigating back to the main page.
### Cart Slice
This code manages the shopping cart using Redux Toolkit. It keeps track of items in the cart, allows users to add new products, remove them, change their quantity, and
clear the cart. When adding an item, it checks if it's already there. If so, it increases the quantity instead of adding a duplicate. It also includes a way to load saved cart data.

### Store
This code sets up the central storage system for managing our app data using Redux Toolkit. It creates a store that keeps track of shopping cart information and allows different parts
of the app to access and update it. The cartReducer is responsible for handling changes to the cart, like adding or removing items. RootState and AppDispatch are types that help
TypeScript understand how to work with the store’s data and actions.

### Types
This code provides the structure for the fetched product data.

### Auth Context
This code creates a special storage area (context) for user information in a React app. It keeps track of the logged-in user and allows the app to update that user’s information. If no user is logged in, it starts with the user set to "null."

### Auth Provider
This code sets up a context provider that tracks the user's authentication status. It uses Firebase's `onAuthStateChanged` function to update the `user` state whenever the user's login status changes. The `AuthContext.Provider` is then used to share the user state with other components in the app.

### App
This code provides routes for navigating around the app. I also wrapped the App in QueryClientProvider in order for us to access the React Query features in the app.

### Main
This code simply provides a wrapped App with Provider containing the store variable. This allows the app access to the store data.

### Firebase Config
This code securely uses all of the Firebase credentials by importing them from an .env file.

<!-- CI/CD PIPELINE -->
### CI/CD Pipeline
Overview
This project uses a GitHub Actions workflow to automate building, testing, and deploying the application. The workflow is triggered on push and pull_request events to the master branch.

Steps
1. Checkout Repository - Retrieves the latest code.
2. Setup Node.js - Uses Node.js version 18.
3. Install Dependencies - Runs npm install in the app directory.
4. Build Project - Executes npm run build.
5. Run Tests - Executes npm run test.
6. Deploy to Vercel - Deploys only if the build and tests pass and the branch is master.

### Environment Variables
The workflow uses GitHub Secrets to securely manage Firebase and Vercel configurations:
```
Firebase: VITE_FIREBASE_API_KEY, VITE_FIREBASE_AUTH_DOMAIN, VITE_FIREBASE_PROJECT_ID, etc.
Vercel: VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID.
```

### Workflow File

```
name: CI/CD

on:
  push:
    branches: [ master ]
  pull_request:
    branches: [ master ]

jobs:
  build-test-deploy:
    runs-on: ubuntu-latest
    env:
      VITE_FIREBASE_API_KEY: ${{ secrets.VITE_FIREBASE_API_KEY }}
      VITE_FIREBASE_AUTH_DOMAIN: ${{ secrets.VITE_FIREBASE_AUTH_DOMAIN }}
      VITE_FIREBASE_PROJECT_ID: ${{ secrets.VITE_FIREBASE_PROJECT_ID }}
      VITE_FIREBASE_STORAGE_BUCKET: ${{ secrets.VITE_FIREBASE_STORAGE_BUCKET }}
      VITE_FIREBASE_MESSAGING_SENDER_ID: ${{ secrets.VITE_FIREBASE_MESSAGING_SENDER_ID }}
      VITE_FIREBASE_APP_ID: ${{ secrets.VITE_FIREBASE_APP_ID }}
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install dependencies
        run: npm install
        working-directory: app

      - name: Build project
        run: npm run build
        working-directory: app

      - name: Run tests
        run: npm run test
        working-directory: app

      - name: Deploy to Vercel
        if: github.ref == 'refs/heads/master'
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: app
          vercel-args: '--prod --yes'

```

<p align="right">(<a href="#readme-top">back to top</a>)</p>
