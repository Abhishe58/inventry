import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Additems.css";

export default function Additems() {
  const name = localStorage.getItem("name");
  const userId = localStorage.getItem("userId");

  const [addProduct, setAddProduct] = useState({
    product: "",
    brand: "",
    category: "",
    stock: 0,
    price: 0,
    sellstocksx: 0,
  });
  const [resp, setresp] = useState("");
  const [message, setMessage] = useState("");

  const navi = useNavigate();
  useEffect(() => {
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
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setAddProduct((prev) => ({ ...prev, [name]: value }));
  };

  const subProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("http://127.0.0.1:5000/addproduct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          product: addProduct.product,
          brand: addProduct.brand,
          category: addProduct.category,
          stock: addProduct.stock,
          price: addProduct.price,
          selstocks: addProduct.sellstocksx,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        navi("/home");
      }
      setresp(data.message);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
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
      <div className="chatbotContainerxc">
        <p>
          <Link className="navLink" to="/home">
            Dashboard
          </Link>{" "}
          &gt;
          <Link className="navLink" to="/additems">
            Add Items
          </Link>
        </p>
        <h2>Add New Inventory Item</h2>
        <div className="moreChatbotContainer">
          <form onSubmit={subProduct} className="chatbotForm">
            <div className="productFormbox">
              <label htmlFor="product">Product</label>
              <select
                className="productformselect"
                required
                name="product"
                onChange={handleChange}
                value={addProduct.product}
              >
                <option value="" disabled>
                  -- Select Product Name --
                </option>
                <option value="Clinic Plus Strong & Long (650ml)">
                  Clinic Plus Strong & Long (650ml)
                </option>
                <option value="Clinic Plus Strong & Long (340ml)">
                  Clinic Plus Strong & Long (340ml)
                </option>
                <option value="Clinic Plus Egg Protein (340ml)">
                  Clinic Plus Egg Protein (340ml)
                </option>
                <option value="Clinic Plus Ayurveda (340ml)">
                  Clinic Plus Ayurveda (340ml)
                </option>
                <option value="Clinic Plus Almond Gold (175ml)">
                  Clinic Plus Almond Gold (175ml)
                </option>
                <option value="H&S Cool Menthol (650ml)">
                  H&S Cool Menthol (650ml)
                </option>
                <option value="H&S Smooth & Silky (340ml)">
                  H&S Smooth & Silky (340ml)
                </option>
                <option value="H&S Anti-Hairfall (340ml)">
                  H&S Anti-Hairfall (340ml)
                </option>
                <option value="H&S Lemon Fresh (180ml)">
                  H&S Lemon Fresh (180ml)
                </option>
                <option value="H&S Neem (180ml)">H&S Neem (180ml)</option>
              </select>
            </div>
            <div className="productFormbox">
              <label htmlFor="brand">Brand</label>
              <select
                required
                className="productformselect"
                name="brand"
                onChange={handleChange}
                value={addProduct.brand}
              >
                <option value="" disabled>
                  -- Select Brand --
                </option>
                <option value="Clinic Plus">Clinic Plus</option>
                <option value="Head & Shoulders">Head & Shoulders</option>
              </select>
            </div>
            <div className="productFormbox">
              <label htmlFor="category">Category</label>
              <select
                className="productformselect"
                required
                name="category"
                onChange={handleChange}
                value={addProduct.category}
              >
                <option value="" disabled>
                  -- Select Category --
                </option>
                <option value="General">General</option>
                <option value="Herbal">Herbal</option>
                <option value="Summer">Summer</option>
                <option value="Beauty">Beauty</option>
                <option value="Monsoon">Monsoon</option>
              </select>
            </div>
            <div className="productFormbox">
              <label htmlFor="stock">Stock</label>
              <input
                type="number"
                className="productformselect"
                name="stock"
                onChange={handleChange}
                value={addProduct.stock}
                required
              />
            </div>
            <div className="productFormbox">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                className="productformselect"
                name="price"
                onChange={handleChange}
                value={addProduct.price}
                required
              />
            </div>
            <button className="loginBut" type="submit">
              Add Product
            </button>
          </form>
          {resp && (
            <div className="resultchatbotContainer">
              <p>{resp}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
