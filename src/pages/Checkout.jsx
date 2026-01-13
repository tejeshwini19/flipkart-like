import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    // 🔹 Handle Buy Now
    const buyNowItem = JSON.parse(localStorage.getItem("buyNowProduct"));

    if (buyNowItem) {
      setCart([buyNowItem]);
      localStorage.removeItem("buyNowProduct");
    } else {
      // 🔹 Normal cart checkout
      const items = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(items);
    }
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const placeOrder = () => {
    if (!address || !phone) {
      alert("Please enter address and phone number");
      return;
    }
    localStorage.removeItem("cart");
    navigate("/success");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f1f3f6",
        display: "flex",
        justifyContent: "center",
        paddingTop: 60,
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial",
      }}
    >
      <div
        style={{
          width: 480,
          background: "white",
          padding: 30,
          borderRadius: 16,
          boxShadow: "0 12px 32px rgba(0,0,0,0.12)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: 24 }}>
          Checkout
        </h2>

        {/* ADDRESS */}
        <div style={{ marginBottom: 18 }}>
          <label style={{ fontWeight: 600, fontSize: 14 }}>
            Address
          </label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows={3}
            placeholder="Enter your address"
            style={{
              width: "100%",
              marginTop: 6,
              padding: 12,
              borderRadius: 8,
              border: "1px solid #ccc",
              fontSize: 14,
              fontFamily: "inherit",
            }}
          />
        </div>

        {/* PHONE */}
        <div style={{ marginBottom: 22 }}>
          <label style={{ fontWeight: 600, fontSize: 14 }}>
            Phone Number
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter phone number"
            style={{
              width: "100%",
              marginTop: 6,
              padding: 12,
              borderRadius: 8,
              border: "1px solid #ccc",
              fontSize: 14,
              fontFamily: "inherit",
            }}
          />
        </div>

        {/* ORDER SUMMARY */}
        <div
          style={{
            borderTop: "1px solid #eee",
            paddingTop: 16,
            marginBottom: 20,
          }}
        >
          <h3 style={{ marginBottom: 12 }}>Order Summary</h3>

          <div style={{ maxHeight: 180, overflowY: "auto" }}>
            {cart.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 10,
                  gap: 12,
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: 48,
                    height: 48,
                    objectFit: "contain",
                    borderRadius: 6,
                    border: "1px solid #eee",
                  }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14 }}>{item.name}</div>
                  <div style={{ fontSize: 13, color: "#555" }}>
                    ₹{item.price}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontWeight: "bold",
              fontSize: 15,
              marginTop: 10,
            }}
          >
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>

        {/* PLACE ORDER */}
        <button
          onClick={placeOrder}
          style={{
            width: "100%",
            padding: 14,
            background:
              "linear-gradient(90deg, #fb641b, #ff8f00)",
            color: "white",
            border: "none",
            borderRadius: 10,
            fontSize: 15,
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Place Order
        </button>
      </div>
    </div>
  );
}

export default Checkout;
