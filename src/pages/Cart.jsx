import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(items);
  }, []);

  const removeItem = (index) => {
    const updated = [...cart];
    updated.splice(index, 1);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  /* ================= EMPTY CART UI ================= */
  if (cart.length === 0) {
    return (
      <div style={styles.page}>
        <div style={styles.emptyCard}>
          <div style={styles.emptyIcon}>🛒</div>
          <h2 style={styles.emptyTitle}>Your Cart is Empty</h2>
          <p style={styles.emptyText}>
            Looks like you haven’t added anything yet.
          </p>

          <button
            style={styles.shopBtn}
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  /* ================= CART WITH ITEMS ================= */
  return (
    <div style={styles.page}>
      <h2 style={styles.title}>My Cart</h2>

      {/* ITEMS */}
      <div style={styles.container}>
        {cart.map((item, index) => (
          <div key={index} style={styles.card}>
            <div style={styles.left}>
              <img
                src={item.image}
                alt={item.name}
                style={styles.image}
              />
              <div>
                <h4 style={styles.name}>{item.name}</h4>
                <p style={styles.price}>₹{item.price}</p>
              </div>
            </div>

            <span
              onClick={() => removeItem(index)}
              style={styles.remove}
            >
              Remove
            </span>
          </div>
        ))}
      </div>

      {/* PRICE DETAILS */}
      <div style={styles.priceBox}>
        <h3 style={{ marginBottom: 10 }}>Price Details</h3>
        <p>Total Items: {cart.length}</p>
        <h4 style={{ marginTop: 8 }}>
          Total Amount: ₹{total}
        </h4>

        <button
          style={styles.buyBtn}
          onClick={() => navigate("/checkout")}
        >
          Proceed to Buy
        </button>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */
const styles = {
  page: {
    minHeight: "100vh",
    background: "#f1f3f6",
    padding: 20,
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  /* EMPTY CART */
  emptyCard: {
    marginTop: 80,
    background: "white",
    padding: "40px 30px",
    borderRadius: 18,
    width: "100%",
    maxWidth: 420,
    textAlign: "center",
    boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 10,
  },
  emptyTitle: {
    marginBottom: 8,
  },
  emptyText: {
    color: "#555",
    marginBottom: 20,
    fontSize: 14,
  },
  shopBtn: {
    padding: "12px 22px",
    background: "#2874f0",
    color: "white",
    border: "none",
    borderRadius: 8,
    fontWeight: "bold",
    cursor: "pointer",
  },

  /* CART */
  title: {
    marginBottom: 20,
  },
  container: {
    width: "100%",
    maxWidth: 720,
  },
  card: {
    background: "white",
    padding: 16,
    borderRadius: 12,
    marginBottom: 14,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
  },
  left: {
    display: "flex",
    alignItems: "center",
    gap: 14,
  },
  image: {
    width: 60,
    height: 60,
    objectFit: "contain",
  },
  name: {
    marginBottom: 4,
  },
  price: {
    fontWeight: "bold",
  },
  remove: {
    color: "#d32f2f",
    fontWeight: "bold",
    cursor: "pointer",
  },

  /* PRICE BOX */
  priceBox: {
    marginTop: 24,
    width: "100%",
    maxWidth: 720,
    background: "white",
    padding: 22,
    borderRadius: 14,
    boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
  },
  buyBtn: {
    width: "100%",
    marginTop: 18,
    padding: 14,
    background: "linear-gradient(90deg, #fb641b, #ff8f00)",
    color: "white",
    border: "none",
    borderRadius: 10,
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default Cart;
