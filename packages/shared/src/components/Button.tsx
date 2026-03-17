import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger";
  size?: "small" | "medium";
  disabled?: boolean;
}

const variantStyles: Record<string, React.CSSProperties> = {
  primary: { backgroundColor: "#ff6b35", color: "#fff", border: "none" },
  secondary: { backgroundColor: "#fff", color: "#ff6b35", border: "2px solid #ff6b35" },
  danger: { backgroundColor: "#dc3545", color: "#fff", border: "none" },
};

const sizeStyles: Record<string, React.CSSProperties> = {
  small: { padding: "6px 12px", fontSize: "13px" },
  medium: { padding: "10px 20px", fontSize: "15px" },
};

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  size = "medium",
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        ...variantStyles[variant],
        ...sizeStyles[size],
        borderRadius: "8px",
        cursor: disabled ? "not-allowed" : "pointer",
        fontWeight: 600,
        transition: "opacity 0.2s",
        opacity: disabled ? 0.6 : 1,
      }}
    >
      {children}
    </button>
  );
};
