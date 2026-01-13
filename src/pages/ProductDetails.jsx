import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const found = products.find(p => p.id === Number(id));
    setProduct(found);
  }, [id]);

  if (!product) {
    return <div style={{ padding: 40 }}>Product not found</div>;
  }

  const buyNow = () => {
    // store selected product for checkout
    localStorage.setItem("cart", JSON.stringify([product]));
    navigate("/checkout"); // ✅ THIS IS THE BUYING PAGE
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} width={200} />
      <h3>₹{product.price}</h3>

      <button
        onClick={buyNow}
        style={{
          marginTop: 20,
          padding: "12px 20px",
          background: "#fb641b",
          color: "white",
          border: "none",
          borderRadius: 6,
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Buy Now
      </button>
    </div>
  );
}

export default ProductDetails;
