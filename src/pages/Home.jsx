import { useEffect, useState } from "react";
import { products as initialProducts } from "../data/products";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [maxPrice, setMaxPrice] = useState(80000);
  const [cartCount, setCartCount] = useState(0);
  const [addedMessage, setAddedMessage] = useState("");

  // Upload feature state
  const [showUpload, setShowUpload] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "Mobiles",
    image: "",
  });

  useEffect(() => {
    const uploaded =
      JSON.parse(localStorage.getItem("uploaded_products")) || [];
    setProducts([...initialProducts, ...uploaded]);

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cart.length);
  }, []);

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    setCartCount(cart.length);

    setAddedMessage("Item added to cart • Flipkart Like");
    setTimeout(() => setAddedMessage(""), 2000);
  };

  const uploadProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) return;

    const uploaded =
      JSON.parse(localStorage.getItem("uploaded_products")) || [];

    const productToAdd = {
      id: Date.now(),
      name: newProduct.name,
      price: Number(newProduct.price),
      category: newProduct.category,
      image: newProduct.image,
      features: ["User uploaded product"],
    };

    uploaded.push(productToAdd);
    localStorage.setItem("uploaded_products", JSON.stringify(uploaded));
    setProducts((prev) => [...prev, productToAdd]);

    setNewProduct({
      name: "",
      price: "",
      category: "Mobiles",
      image: "",
    });

    setShowUpload(false);
  };

  const filtered = products.filter(
    (p) =>
      (category === "All" || p.category === category) &&
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      p.price <= maxPrice
  );

  return (
    <div style={{ background: "#f1f3f6", minHeight: "100vh" }}>
      {/* ADD TO CART TOAST */}
      {addedMessage && (
        <div
          style={{
            position: "fixed",
            bottom: 30,
            left: "50%",
            transform: "translateX(-50%)",
            background: "#2874f0",
            color: "white",
            padding: "14px 24px",
            borderRadius: 30,
            fontWeight: "bold",
            boxShadow: "0 6px 15px rgba(0,0,0,0.3)",
            zIndex: 3000,
          }}
        >
          ✅ {addedMessage}
        </div>
      )}

      {/* HEADER */}
      <div
        style={{
          background: "#2874f0",
          padding: 15,
          color: "white",
          display: "flex",
          alignItems: "center",
          gap: 15,
        }}
      >
        <h2 style={{ marginRight: 20 }}>Flipkart Like</h2>

        <input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: 8, width: "40%" }}
        />

        <button
          onClick={() => navigate("/login")}
          style={{
            background: "white",
            color: "#2874f0",
            border: "none",
            padding: "8px 18px",
            fontWeight: "bold",
            cursor: "pointer",
            borderRadius: 2,
          }}
        >
          Login
        </button>

        <button
          onClick={() => navigate("/cart")}
          style={{
            background: "#ff9f00",
            border: "none",
            padding: "8px 14px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          View Cart ({cartCount})
        </button>
      </div>

      {/* CATEGORIES + UPLOAD */}
      <div style={{ padding: 10, background: "white" }}>
        {["All", "Mobiles", "Laptops", "Accessories", "Gaming"].map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            style={{
              marginRight: 10,
              padding: "6px 14px",
              background: category === c ? "#2874f0" : "#ddd",
              color: category === c ? "white" : "black",
              border: "none",
              cursor: "pointer",
            }}
          >
            {c}
          </button>
        ))}

        <button
          onClick={() => setShowUpload(!showUpload)}
          style={{
            marginLeft: 10,
            padding: "6px 14px",
            background: "#2e7d32",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Upload New Product
        </button>
      </div>

      {/* UPLOAD FORM */}
      {showUpload && (
        <div
          style={{
            background: "white",
            margin: 20,
            padding: 20,
            borderRadius: 8,
          }}
        >
          <h3>Upload Product</h3>

          <input
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            style={{ marginRight: 10, padding: 8 }}
          />

          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
            style={{ marginRight: 10, padding: 8 }}
          />

          <select
            value={newProduct.category}
            onChange={(e) =>
              setNewProduct({ ...newProduct, category: e.target.value })
            }
            style={{ marginRight: 10, padding: 8 }}
          >
            <option>Mobiles</option>
            <option>Laptops</option>
            <option>Accessories</option>
            <option>Gaming</option>
          </select>

          <input
            placeholder="Image URL"
            value={newProduct.image}
            onChange={(e) =>
              setNewProduct({ ...newProduct, image: e.target.value })
            }
            style={{ marginRight: 10, padding: 8, width: "250px" }}
          />

          <button
            onClick={uploadProduct}
            style={{
              background: "#fb641b",
              color: "white",
              border: "none",
              padding: "8px 16px",
              cursor: "pointer",
            }}
          >
            Add Product
          </button>
        </div>
      )}

      {/* PRICE FILTER */}
      <div style={{ padding: 15, background: "white" }}>
        <strong>Max Price:</strong>
        <input
          type="range"
          min="1000"
          max="80000"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
        />
        <span> ₹{maxPrice}</span>
      </div>

      {/* PRODUCTS */}
      <div
        style={{
          padding: 20,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px,1fr))",
          gap: 20,
        }}
      >
        {filtered.map((p) => (
          <div
            key={p.id}
            onClick={() => setSelected(p)}
            style={{
              background: "white",
              padding: 15,
              borderRadius: 8,
              cursor: "pointer",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={p.image}
              alt={p.name}
              style={{ height: 150, width: "100%", objectFit: "contain" }}
            />
            <h4>{p.name}</h4>
            <p>₹{p.price}</p>

            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(p);
              }}
              style={{
                background: "#fb641b",
                color: "white",
                border: "none",
                padding: 8,
                width: "100%",
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* PRODUCT MODAL */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "white",
              borderRadius: 12,
              width: 380,
              padding: 20,
            }}
          >
            <h3>{selected.name}</h3>
            <ul>
              {selected.features.map((f, i) => (
                <li key={i}>✔ {f}</li>
              ))}
            </ul>

            {/* BUY NOW – FIXED */}
            <button
              onClick={() => {
                localStorage.setItem(
                  "cart",
                  JSON.stringify([selected])
                );
                navigate("/checkout");
              }}
              style={{
                width: "100%",
                marginTop: 10,
                padding: 10,
                background: "#fb641b",
                color: "white",
                border: "none",
                fontWeight: "bold",
              }}
            >
              Buy Now
            </button>

            <button
              onClick={() => setSelected(null)}
              style={{
                width: "100%",
                marginTop: 10,
                padding: 10,
                background: "#2874f0",
                color: "white",
                border: "none",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
