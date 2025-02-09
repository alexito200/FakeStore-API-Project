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
        <li><a href="#">Home</a></li>
        <li><a href="#">Product Card</a></li>
        <li><a href="#">Shopping Cart</a></li>
        <li><a href="#">Cart Slice</a></li>
        <li><a href="#">Store</a></li>
        <li><a href="#">Types</a></li>
        <li><a href="#">App</a></li>
        <li><a href="#">Main</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
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
### Product Card
This code uses the fetched data from Product to display the image, title, price, and a button with an onClick event. The button is used to add the product to the cart.
### Shopping Cart
This code displays the items in the user's shopping cart where they can see the total number of items and their total price. It saves the cart data in session storage whenever the cart
updates. Users can remove items from the cart, and if they proceed to checkout, the cart is cleared, and they are redirected to the homepage. The component also allows users to continue
shopping by navigating back to the main page.
### Cart Slice
This code manages the shopping cart using Redux Toolkit. It keeps track of items in the cart, allows users to add new products, remove them, change their quantity, and
clear the cart. When adding an item, it checks if it's already there. If so, it increases the quantity instead of adding a duplicate. It also includes a way to load saved cart data.
### Store
This code sets up the central storage system for managing our app data using Redux Toolkit. It creates a store that keeps track of shopping cart information and allows different parts
of the app to access and update it. The cartReducer is responsible for handling changes to the cart, like adding or removing items. RootState and AppDispatch are types that help
TypeScript understand how to work with the store’s data and actions.
### Types
This code provides the structure for the fetched product data.
### App
This code provides routes for navigating around the app. I also wrapped the App in QueryClientProvider in order for us to access the React Query features in the app.
### Main
This code simply provides a wrapped App with Provider containing the store variable. This allows the app access to the store data.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
