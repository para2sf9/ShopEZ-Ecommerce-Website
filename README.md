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

<b>Creating project folder</b>
<img width="375" height="145" alt="image" src="https://github.com/user-attachments/assets/2a380750-5cd5-468f-a161-174df2d0cccc" />

Client setup (installing react app)
npm create vite@latest . -- --template react
cd client
npm install
npm run dev

Server setup (npm init)
cd server
npm init -y
Create files: server.js
Create folders: models controllers routes
npm run dev

>b>Backend Structure</b>
<img width="372" height="472" alt="image" src="https://github.com/user-attachments/assets/31a76394-22b3-4b97-ba60-633e82fbb714" />


Development and explanation:
1.Setup express server:   

• Create index.js file.         

 • Create an express server on your desired port number.         

 • Define API’s

 2. Database Configuration: 

• Set up a MongoDB database either locally or using a cloud-based MongoDB service like MongoDB Atlas or use locally with MongoDB compass. 

• Create a database and define the necessary collections for admin, users, products,  orders and other relevant data. 

3. Create Express.js Server: 

• Set up an Express.js server to handle HTTP requests and serve API endpoints. 

• Configure middleware such as body-parser for parsing request bodies and cors for handling cross-origin requests.

4. Define API Routes: 

• Create separate route files for different API functionalities such as users, orders, and authentication. 

• Define the necessary routes for listing products, handling user registration and  login,managing orders, etc. 

• Implement route handlers using Express.js to handle requests and interact with the database. 

5. Implement Data Models: 

• Define Mongoose schemas for the different data entities like products, users,  and orders. 

• Create corresponding Mongoose models to interact with the MongoDB database.

 • Implement CRUD operations (Create, Read, Update, Delete) for each model to perform database operations.

6. User Authentication:

• Create routes and middleware for user registration, login, and logout.

 • Set up authentication middleware to protect routes that require user authentication. 
         
7. Handle new products and Orders: 

• Create routes and controllers to handle new product listings, including fetching products data from the database and sending it as a response. 

• Implement ordering(buy) functionality by creating routes and controllers to  handle order requests, including validation and database updates. 
    
8. Admin Functionality: 

• Implement routes and controllers specific to admin functionalities such as adding products, managing user orders, etc. 

• Add necessary authentication and authorization checks to ensure only authorized admins can access these routes. 

9. Error Handling: 

• Implement error handling middleware to catch and handle any errors that occur during the API requests. 

• Return appropriate error responses with relevant error messages and HTTP status codes.

<b>Database Connection</b>

Configure MongoDB
npm install mongoose
<img width="858" height="484" alt="image" src="https://github.com/user-attachments/assets/32f2a135-06fc-45f3-802d-ee29a7145586" />
<img width="685" height="648" alt="image" src="https://github.com/user-attachments/assets/8bea96be-e120-4196-a611-f3f800272753" />
<img width="680" height="778" alt="image" src="https://github.com/user-attachments/assets/f474be2d-b3da-428a-93c5-2b92799507ea" />

<Frontend Structure<b/>
<img width="369" height="545" alt="image" src="https://github.com/user-attachments/assets/42d4e83e-6514-457e-915e-a98663d65d03" />

Development and Explaination
1. Setup React Application:

• Create a React app in the client folder.

• Install required libraries

• Create required pages and components and add routes.

2.Design UI components:

• Create Components.

• Implement layout and styling.

• Add navigation.

3.Implement frontend logic:

• Integration with API endpoints.

• Implement data binding.


<b>Project Execution</b>
 Step 1: Set Up the Frontend (React App):

 a) Open a terminal and navigate into the client folder:

        cd client

b) Once installation is done, start the React development server:

      npm run dev

c) The app should now be running on:

     http://localhost:5173

Step 2: Set Up the Backend (Express Server)


  a)  Open a new terminal tab/window or split the terminal.

  b) Navigate into the server folder:

        cd ../server




Step 3: Configure Environment Variables

Inside the server folder, create a new file named .env (no file extension).

In that .env file, add your MongoDB connection string:

           MONGO_URI=mongodb://localhost:27017/<— dbname—>

     

Step 4: Start the Backend Server:

Inside the same server folder, run the backend server using:

             nodemon index.js

The server should start on:

http://localhost:8000

<b>Demo Screenshot</>
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/e4e3f4a1-985b-4f9a-a2a0-6df1eb50d0cb" />
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/94d1fe59-47d7-4975-9325-69c89ea8da90" />
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/af048c90-e5b9-4beb-afce-54c61dc1f3aa" />
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/2b79a6da-355d-4d19-9a00-489a49743a06" />
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/0fcf9c5f-2832-4766-b232-9ad14b0bb1fd" />
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/a2a77584-ee62-49e0-97aa-abccaabe5a8b" />
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/7cf0a4cc-95ce-40f2-8910-6ea463fe4aeb" />
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/3a6ed835-94b5-4dc1-be9d-fc895f3f6551" />
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/3db250b7-b4ab-4656-a411-8ea84a1b92f0" />
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/ffa596e3-6a8a-4541-b682-09994efc3383" />
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/d12e9a49-0647-45ca-aba9-e120513d9d2d" />
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/570e118d-9974-47bd-8f15-3551ae3a4b00" />
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/51e5db24-3eda-4d6e-84f9-e180b56ade19" />
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/8061661d-8b49-4b61-bd31-77874d919d17" />
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/10428a0c-9f3c-474b-8fc2-a9edfd8343bd" />
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/d34173b8-f418-4d68-8914-accc7e582bef" />
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/0270199f-aedd-400f-b1dd-40a0d0dd10ac" />
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/3882b083-9ceb-4809-bce3-3196b3929e67" />
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/9c67d570-d58b-44fd-8a53-005b76cffdc3" />
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/ca31d46e-1660-43e0-af1d-00c6069682b5" />
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/3ede3da6-f83b-4674-b4c9-c9c48e0833fa" />
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/ecf009aa-8519-457e-bdb7-6467d9ab9446" />
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/ef2d03cc-6bfe-49be-8113-141ca348da36" />
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/17de824c-38a3-471a-a0dc-a563077fdd4f" />
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/5a80e06a-617d-481a-8895-bb1043b08ad8" />
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/2a86c208-3d76-4b11-ae39-f57bfa1a2a72" />
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/5abaa3b7-b1d9-4c7b-8e72-1f00b202d816" />
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/4dd39813-28c2-475e-8cb0-09087d1ff73a" />














<b>Google Drive Link</b>
https://drive.google.com/drive/folders/1X8-e2dXzYIYmwLr1QZhR2ABJfuMaxDGd?usp=drive_link










