import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>

        <input placeholder="Full Name" style={styles.input} />
        <input type="email" placeholder="Email" style={styles.input} />
        <input type="password" placeholder="Password" style={styles.input} />

        <button
          style={styles.button}
          onClick={() => navigate("/login")}
        >
          Register
        </button>

        <p style={styles.text}>
          Already have an account?{" "}
          <span
            style={styles.link}
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
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
    padding: 32,
    borderRadius: 14,
    width: "100%",
    maxWidth: 400,
    boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
  },
  title: {
    textAlign: "center",
    marginBottom: 24,
  },
  input: {
    width: "100%",
    padding: 12,
    marginBottom: 14,
    borderRadius: 8,
    border: "1px solid #ccc",
    fontSize: 14,
  },
  button: {
    width: "100%",
    padding: 12,
    background: "#fb641b",
    color: "white",
    border: "none",
    borderRadius: 8,
    fontWeight: "bold",
    cursor: "pointer",
  },
  text: {
    textAlign: "center",
    marginTop: 16,
    fontSize: 14,
  },
  link: {
    color: "#2874f0",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default Register;
