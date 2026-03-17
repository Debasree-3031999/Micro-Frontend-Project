import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Header: React.FC = () => {
  const { totalItems } = useCart();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + "/");

  const linkStyle = (path: string): React.CSSProperties => ({
    color: isActive(path) ? "#ff6b35" : "#fff",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: isActive(path) ? 700 : 400,
    padding: "8px 16px",
    borderRadius: "8px",
    backgroundColor: isActive(path) ? "rgba(255,255,255,0.15)" : "transparent",
    transition: "all 0.2s",
  });

  return (
    <header
      style={{
        backgroundColor: "#1a1a2e",
        padding: "0 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "64px",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
      }}
    >
      <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{ fontSize: "28px" }}>🍽️</span>
        <span style={{ color: "#ff6b35", fontSize: "22px", fontWeight: 800 }}>FoodDash</span>
      </Link>

      <nav style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <Link to="/" style={linkStyle("/")}>Home</Link>
        <Link to="/restaurants" style={linkStyle("/restaurants")}>Restaurants</Link>
        <Link to="/cart" style={{ ...linkStyle("/cart"), position: "relative" }}>
          Cart
          {totalItems > 0 && (
            <span
              style={{
                position: "absolute",
                top: "-4px",
                right: "-4px",
                backgroundColor: "#ff6b35",
                color: "#fff",
                borderRadius: "50%",
                width: "20px",
                height: "20px",
                fontSize: "12px",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {totalItems}
            </span>
          )}
        </Link>
      </nav>
    </header>
  );
};

export default Header;
