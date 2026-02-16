import { useEffect, useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";

type Product = {
  _id: number;
  product: string;
  brand: string;
  category: string;
  stock: number;
  price: number;
  selstocks: number;
};

export default function Home() {
  const name = localStorage.getItem("name");
  const userId = localStorage.getItem("userId");

  const [product, setProduct] = useState<Product[]>([]);
  const [stocks, setStocks] = useState<number>();
  const [sellstocks, setSellstocks] = useState<number>();
  const [message, setMessage] = useState("");

  const productImagemap: { [key: string]: string } = {
    "Clinic Plus Strong & Long (650ml)":
      "./clinic-plus-strong-and-long-health-shampoo-650-ml.jpg",
    "Clinic Plus Strong & Long (340ml)":
      "./clinic-plus-strong-and-long-health-shampoo-650-ml.jpg",
    "Clinic Plus Egg Protein (340ml)":
      "./clinic-plus-strength-and-shine-with-egg-protein-shampoo-340-ml.webp",
    "Clinic Plus Ayurveda (340ml)": "./Clinic-Plus-Ayurveda-(340ml).jpg",
    "Clinic Plus Almond Gold (175ml)":
      "./clinic-plus-strong-thick-almond-gold-oil-health-shampoo-175.webp",
    "H&S Cool Menthol (650ml)": "./H&S-Cool-Menthol-(650ml).jpg",
    "H&S Smooth & Silky (340ml)": "./H&S-Smooth-&-Silky-(340ml).webp",
    "H&S Anti-Hairfall (340ml)": "./H&S-Anti-Hairfall-(340ml).webp",
    "H&S Lemon Fresh (180ml)": "./H&S-Lemon-Fresh-(180ml).jpg",
    "H&S Neem (180ml)": "./H&S-Neem-(180ml).jpg",
  };
  const getInvetry = async () => {
    if (!userId) {
      console.log("User need to login");
      return;
    }
    try {
      const res = await fetch(
        `https://inventryser.onrender.com/product/${userId}`,
      );
      const data = await res.json();
      setProduct(data);
    } catch (error) {}
  };
  useEffect(() => {
    getInvetry();

    const hour = new Date().getHours();

    if (hour < 12) {
      setMessage("Good Morning");
    } else if (hour < 17) {
      setMessage("Good Afternoon");
    } else if (hour < 21) {
      setMessage("Good Evening");
    } else {
      setMessage("Good Night");
    }
  }, []);

  const addStocks = async (id: number) => {
    try {
      const res = await fetch(
        `https://inventryser.onrender.com/stocksupdate/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ stocksto: stocks }),
        },
      );
      const data = await res.json();
      if (res.ok) {
        // Update the UI: Find the product in your list and update its stock count
        setProduct((prevProducts) =>
          prevProducts.map((item) =>
            item._id === id ? { ...item, stock: data.stock } : item,
          ),
        );

        setStocks(0);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sellstockks = async (id: number) => {
    try {
      const res = await fetch(
        `https://inventryser.onrender.com/stockssell/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ stockssell: sellstocks }),
        },
      );
      const data = await res.json();
      if (res.ok) {
        setProduct((prev) =>
          prev.map((item) =>
            item._id === id
              ? { ...item, stock: data.stock, selstocks: data.selstocks }
              : item,
          ),
        );
        setSellstocks(0);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      const res = await fetch(
        `https://inventryser.onrender.com/deletePro/${id}`,
        {
          method: "DELETE",
        },
      );
      if (res.ok) {
        setProduct((prev) => prev.filter((items) => items._id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const totalValuation = product.reduce((sum, item) => {
    return sum + item.price * item.stock;
  }, 0);

  const lowStockCount = product.filter((item) => item.stock < 10).length;
  return (
    <>
      <div>
        <header>
          <h1>
            Inventry <span style={{ color: "royalblue" }}>Management</span>
          </h1>
          <div className="headerBox">
            <h2>
              {message},{name}
            </h2>
          </div>
        </header>
        <main>
          <div className="mainDasContainer">
            <div className="desBoxa">
              <p className="desp">
                Total Inventory Valuation: ₹
                {totalValuation.toLocaleString("en-IN")}
              </p>
              <p className="desp">Low Stock Alerts: {lowStockCount} Items</p>
            </div>
            <div className="desBoxa">
              <p className="desp">
                <Link className="linkdesp" to="/additems">
                  Add Item
                </Link>
              </p>

              <p className="desp">
                <Link className="linkdesp" to="/artificialintelligence">
                  Artificial Intelligence
                </Link>
              </p>
            </div>
          </div>
          <div className="mainContainera">
            <h2>Products</h2>
            <div className="productContainer">
              {product.map((items) => (
                <div key={items._id} className="productBox">
                  <img
                    src={productImagemap[items.product] || "./img.jpg"}
                    alt={items.product}
                    className="productImg"
                  />
                  {items.stock < 10 && (
                    <p style={{ color: "red", fontSize: "19px" }}>
                      Warning Low Stocks
                    </p>
                  )}
                  <p
                    style={{
                      fontSize: "18px",
                      color: "royalblue",
                      fontWeight: "600",
                    }}
                  >
                    Product: {items.product}
                  </p>
                  <p>Brand: {items.brand}</p>
                  <p>Category: {items.category}</p>
                  <p>Stocks: {items.stock}</p>
                  <p>Price: {items.price}</p>
                  <p>Sell Stocks: {items.selstocks}</p>
                  <form
                    onSubmit={() => addStocks(items._id)}
                    className="addstockform"
                  >
                    <input
                      type="number"
                      className="addstockInput"
                      placeholder="Add Stocks"
                      name="addstock"
                      onChange={(e) => setStocks(Number(e.target.value))}
                      value={stocks}
                      required
                    />
                    <button type="submit" className="addstockBut">
                      Add Stock
                    </button>
                  </form>
                  <form
                    onSubmit={() => sellstockks(items._id)}
                    className="addstockform"
                  >
                    <input
                      type="number"
                      className="addstockInput"
                      placeholder="Sell Product"
                      name="sellstock"
                      onChange={(e) => setSellstocks(Number(e.target.value))}
                      value={sellstocks}
                      required
                    />
                    <button type="submit" className="addstockBut">
                      Sell Stocks
                    </button>
                  </form>
                  <button
                    onClick={() => deleteProduct(items._id)}
                    className="productdeleteBut"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
