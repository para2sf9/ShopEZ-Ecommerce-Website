# ShopEZ-Ecommerce-Website
ShopEZ is your one-stop destination for effortless online shopping. With a user-friendly interface and a comprehensive product catalog, finding the perfect items has never been easier. 
HyperText Markup Language (HTML)
Cascading Style Sheets (CSS)
JavaScript (Programming Language)
React.js (Javascript Library)
Node.js (Javascript Library)
Express.js (Javascript Library)
MongoDB

<h1>Project Architecture</h1>

<b>Technical Architecture</b>
<img width="2720" height="2480" alt="shopez_technical_architecture" src="https://github.com/user-attachments/assets/0ee1b334-99c5-48bf-ad49-109c6d7697c1" />

<b>ER DIAGRAM:</b>
<img width="416" height="497" alt="image" src="https://github.com/user-attachments/assets/59f4d84d-1eff-4e2b-b2cd-338e4737ee16" />


<b>FEATURES:</b>
The ShopEZ application provides several features to improve the shopping experience and simplify store management.
User Authentication:
The application allows users to create an account, log in securely, and maintain authenticated sessions using JSON Web Tokens (JWT). Passwords are securely encrypted before being stored in the database.
Product Management:
Users can browse all available products, search for products using keywords, apply filters based on categories or price, and view detailed product descriptions before purchasing.
Shopping Cart:
Customers can add products to their shopping cart, update product quantities, remove products from the cart, and review their selected items before checkout.
Order Management:
After selecting products, users can enter shipping information, place orders, and view previous purchases through their order history.
Admin Dashboard:
Administrators can manage products and monitor customer orders through a centralized dashboard. They can also update the order status from processing to shipped or delivered.
Responsive User Interface:
The application is designed with a responsive layout, allowing users to access the website from desktops, tablets, and mobile devices without affecting usability.

<b>ROLES AND RESPONSIBILITIES:</b>
Customer/User:
Register and login using JWT authentication.
Browse products with search, filtering, and sorting.
View product details.
Add products to the cart.
Purchase products using Buy Now or Checkout.
Manage shipping information.
View order history.
Update profile details.

Admin:
Secure login with admin authorization.
Add new products.
Edit existing products.
Delete products.
View all customer orders.
Update order status (Pending, Shipped, Delivered, etc.).
Monitor dashboard statistics.

<b>User Flow:</b>
<img width="2720" height="2456" alt="shopez_user_flow" src="https://github.com/user-attachments/assets/4ab2a487-c3d5-4022-b7dd-8cd01996f420" />
The user flow describes how a customer interacts with the ShopEZ application from registration to order completion.
Step 1: Registration
A new user visits the website and creates an account by providing personal details such as name, email, and password. After successful registration, the user's information is securely stored in the database.
Step 2: Login
The registered user logs into the application using valid credentials. Upon successful authentication, a JWT token is generated, allowing access to protected features.
Step 3: Product Browsing
After logging in, users can browse available products, search for specific items, and apply filters based on categories or pricing.
Step 4: Product Selection
The customer selects a desired product and views its complete description, images, price, and availability before deciding to purchase.
Step 5: Shopping Cart
Selected products are added to the shopping cart. Users can increase or decrease quantities or remove products before proceeding.
Step 6: Checkout
The customer proceeds to checkout, enters shipping details, verifies the order summary, and confirms the purchase.
Step 7: Order Confirmation
The order is stored in the database, and the customer receives confirmation. The order then becomes visible in the user's order history.

Admin Workflow
The administrator logs into the admin dashboard, manages products, monitors customer orders, updates order statuses, and maintains the overall inventory.

<b>MVC Pattern:</b>
<img width="2720" height="1280" alt="shopez_mvc_pattern" src="https://github.com/user-attachments/assets/c250ab1a-cabb-4330-9c3a-bf0390c26123" />

