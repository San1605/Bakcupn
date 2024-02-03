import React from "react";
import errorBoundImage from "../../assets/img/imgg/errorboundries.svg";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    // console.log(error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div style={{display : "flex", justifyContent : "center", alignItems : "center"}}>
          <img style={{height : "auto", maxWidth : "100%"}} src={errorBoundImage} alt="error" />
        </div>
      );
    }

    return this.props.children;
  }
}

