import React from "react";
class ErrorBoundaries extends  React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            errorInfo: null
        }
    }
    static getDerivedStateFromError(error) {
        return { hasError: true };
      }
    componentDidCatch(error, errorInfo) {
        this.setState = {
            error: error,
            errorInfo: errorInfo
        }
    }
    render() {
        if (this.state.errorInfo) {
            return (
                <>
                    <h2>An Error Has Occurred</h2>
                    <details>
                        {this.state.error && this.state.error.toString()}
                        <br />
                        {this.state.errorInfo.componentStack}
                    </details>
                </>
            )
        }
        return this.props.children
    }
}

export default ErrorBoundaries