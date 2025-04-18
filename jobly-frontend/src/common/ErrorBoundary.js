import React from "react";
import { useNavigate } from "react-router-dom";
import "./ErrorBoundary.css";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="ErrorBoundary">
          <div className="ErrorBoundary-content">
            <h2>Something went wrong</h2>
            <p className="ErrorBoundary-message">
              {this.state.error?.message || "An unexpected error occurred"}
            </p>
            {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
              <details className="ErrorBoundary-details">
                <summary>Error Details</summary>
                <pre>{this.state.errorInfo.componentStack}</pre>
              </details>
            )}
            <div className="ErrorBoundary-actions">
              <button 
                className="btn btn-primary"
                onClick={() => window.location.reload()}
              >
                Refresh Page
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => this.props.navigate('/')}
              >
                Go Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Wrapper component to use hooks
function ErrorBoundaryWrapper(props) {
  const navigate = useNavigate();
  return <ErrorBoundary {...props} navigate={navigate} />;
}

export default ErrorBoundaryWrapper; 