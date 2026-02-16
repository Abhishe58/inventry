import { useEffect, useState } from "react";
import "./Pred.css";
import { Link } from "react-router-dom";

export default function Pred() {
  const name = localStorage.getItem("name");
  // 1. Manage form state
  const [formData, setFormData] = useState({
    date: "",
    productName: "",
    priceInr: "",
    marketingSpendInr: "",
    eventType: "Normal Day",
  });

  // 2. Manage UI state (Loading, Errors, and Final Result)
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

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

  // 3. Handle the form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      // Connect to your local FastAPI server
      const response = await fetch(
        "https://urban-lamp-tdoj.onrender.com/predict",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            date: formData.date,
            productName: formData.productName,
            priceInr: parseFloat(formData.priceInr),
            marketingSpendInr: parseFloat(formData.marketingSpendInr),
            eventType: formData.eventType,
          }),
        },
      );

      if (!response.ok) throw new Error("Failed to fetch prediction");

      const data = await response.json();
      setResult(data.predicted_units_sold);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
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
          <Link className="navLink" to="/artificialintelligence">
            Artificial Intelligence
          </Link>
        </p>
        <h2>Demand Forecaster</h2>
        <div className="moreChatbotContainer">
          <form onSubmit={handleSubmit} className="chatbotForm">
            <div className="chatbotformBox">
              <label className="block text-sm font-medium text-gray-700">
                Forecast Date
              </label>
              <input
                type="date"
                required
                className="chatbotinput"
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />
            </div>

            <div className="chatbotformBox">
              <label className="block text-sm font-medium text-gray-700">
                Select Product
              </label>
              <select
                required
                className="chatbotinput"
                onChange={(e) =>
                  setFormData({ ...formData, productName: e.target.value })
                }
              >
                <option value="">-- Choose Product --</option>
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

            <div className="chatbotformBox">
              <label className="block text-sm font-medium text-gray-700">
                Selling Price (₹)
              </label>
              <input
                type="number"
                required
                placeholder="e.g. 250"
                className="chatbotinput"
                onChange={(e) =>
                  setFormData({ ...formData, priceInr: e.target.value })
                }
              />
            </div>
            <div className="chatbotformBox">
              <label className="block text-sm font-medium text-gray-700">
                Ad Spend (₹)
              </label>
              <input
                type="number"
                required
                placeholder="e.g. 1500"
                className="chatbotinput"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    marketingSpendInr: e.target.value,
                  })
                }
              />
            </div>

            <div className="chatbotformBox">
              <label className="block text-sm font-medium text-gray-700">
                Event Context
              </label>
              <select
                required
                className="chatbotinput"
                onChange={(e) =>
                  setFormData({ ...formData, eventType: e.target.value })
                }
              >
                <option value="Normal Day">Normal Day</option>
                <option value="Diwali">Diwali</option>
                <option value="National Sale">
                  National Sale (15 Aug / 26 Jan)
                </option>
                <option value="Holi">Holi</option>
                <option value="Raksha Bandhan">Raksha Bandhan</option>
                <option value="Wedding Season">Wedding Season</option>
              </select>
            </div>

            <button type="submit" disabled={isLoading} className="loginBut">
              {isLoading ? "Calculating..." : "Predict Demand"}
            </button>
            {error && (
              <p className="mt-4 text-red-500 font-semibold text-center">
                {error}
              </p>
            )}
          </form>
          {result !== null && (
            <div className="resultchatbotContainer">
              <p className="label">Predicted Inventory Required:</p>
              <p className="unites">{result} Units</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
