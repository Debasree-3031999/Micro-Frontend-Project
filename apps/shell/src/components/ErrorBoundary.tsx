import React, { Component } from "react";

interface Props {
  fallback: React.ReactNode;
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: "40px",
            textAlign: "center",
            backgroundColor: "#fff3f3",
            borderRadius: "12px",
            margin: "20px",
          }}
        >
          <h2 style={{ color: "#dc3545", marginBottom: "12px" }}>
            {this.props.fallback}
          </h2>
          <p style={{ color: "#666" }}>
            This micro frontend failed to load. Make sure its dev server is running.
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            style={{
              marginTop: "16px",
              padding: "10px 24px",
              backgroundColor: "#ff6b35",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
