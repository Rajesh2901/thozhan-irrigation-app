import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught application error:", error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-slate-800 border border-slate-700 rounded-3xl p-8 shadow-2xl text-center space-y-6">
            <div className="w-16 h-16 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center mx-auto text-3xl">
              <i className="fa-solid fa-triangle-exclamation"></i>
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-slate-100">Something went wrong</h2>
              <p className="text-slate-400 text-sm">
                An unexpected error occurred while rendering this component. Please reload the application.
              </p>
            </div>
            <button
              onClick={this.handleReload}
              className="w-full bg-brand-600 hover:bg-brand-500 text-white font-bold py-3 px-6 rounded-xl transition shadow-lg flex items-center justify-center space-x-2"
            >
              <i className="fa-solid fa-rotate-right"></i>
              <span>Reload Application</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
