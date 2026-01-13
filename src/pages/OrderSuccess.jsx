import { useNavigate } from "react-router-dom";

function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <div style={styles.icon}>✅</div>
        <h2>Order Successful</h2>
        <p style={styles.text}>
          Thank you for shopping with Flipkart Like
        </p>

        <button
          style={styles.button}
          onClick={() => navigate("/")}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    background: "#f1f3f6",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial",
  },
  card: {
    background: "white",
    padding: 36,
    borderRadius: 16,
    width: "100%",
    maxWidth: 420,
    textAlign: "center",
    boxShadow: "0 12px 32px rgba(0,0,0,0.14)",
  },
  icon: {
    fontSize: 60,
    marginBottom: 16,
  },
  text: {
    color: "#555",
    marginBottom: 24,
    fontSize: 15,
  },
  button: {
    padding: "12px 24px",
    background: "#2874f0",
    color: "white",
    border: "none",
    borderRadius: 10,
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default OrderSuccess;
