# AI-Powered Inventory Management System

A full-stack **Inventory Management System** built using the **MERN Stack** with an integrated **AI/ML-based stock prediction feature**.

The application helps businesses manage their inventory efficiently by allowing users to add products, update product details, increase stock, sell stock, monitor inventory value, and identify low-stock products. The AI/ML module analyzes product stock and sales data to predict future stock requirements and help prevent products from going out of stock.

---

## Live Demo

Visit the live website here:

[Live Website](https://inventrymanagementj.netlify.app)

## Features

### Product Management

- Add new products to inventory
- Store product image, name, brand, category, price, and stock quantity
- Update product details
- Delete products from inventory
- View all available products in card format
- Search products by name, brand, or category
- Manage multiple product categories

### Stock Management

- Add stock when new inventory arrives
- Sell stock when a product is sold
- Automatically update available stock quantity
- Track sold stock quantity for each product
- Prevent selling more products than available stock
- Maintain product stock information in real time
- View current stock quantity for every product

### Inventory Dashboard

- View total inventory valuation
- View total number of products
- View low-stock product alerts
- Monitor current inventory status
- Display products with stock, price, category, and brand details
- Quick actions for adding products and accessing AI features

### AI/ML Stock Prediction

- Predict future stock requirements for products
- Analyze available stock and sold stock data
- Identify products that may become low in stock
- Suggest stock quantity required for future demand
- Help reduce overstocking and out-of-stock situations
- Display stock prediction results for inventory planning

---

## Technology Stack

### Frontend

- React.js
- React Router DOM
- Axios
- Context API or Redux Toolkit
- CSS / Tailwind CSS / Bootstrap
- React Toastify

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcrypt.js
- dotenv
- Multer for product image upload

### AI/ML Module

- Python
- Pandas
- NumPy
- Scikit-learn
- Flask or FastAPI
- Machine Learning model for stock prediction

---

## Main Pages

- Login Page
- Register Page
- Inventory Dashboard
- Products Page
- Add Product Page
- Update Product Page
- Stock Management Page
- Low Stock Alerts Page
- AI Stock Prediction Page
- Profile Page

---

## Product Details

Each product includes the following details:

- Product Name
- Product Image
- Brand Name
- Category
- Current Stock Quantity
- Product Price
- Sold Stock Quantity
- Product Creation Date
- Product Update Date

---

## Stock Actions

| Action | Description |
| --- | --- |
| `Add Stock` | Adds new quantity to the selected product stock. |
| `Sell Stock` | Reduces stock quantity when a product is sold. |
| `Update Product` | Updates product information such as name, price, brand, or category. |
| `Delete Product` | Removes the product from inventory. |
| `Low Stock Alert` | Shows products that are below the minimum stock level. |
| `AI Prediction` | Predicts future stock requirements based on product sales data. |

---
## Author

**Abhishek**  
MERN Stack Developer

---

## License

This project is created for learning and portfolio purposes.
  createdAt: Date,
  updatedAt: Date
}
