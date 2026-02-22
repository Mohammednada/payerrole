import { Component, type ReactNode, type ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="flex h-full items-center justify-center p-8">
            <div className="text-center">
              <h2 className="mb-2 text-xl font-semibold text-text-primary">
                Something went wrong
              </h2>
              <p className="mb-4 text-text-secondary">
                {this.state.error?.message ?? 'An unexpected error occurred.'}
              </p>
              <button
                onClick={() => this.setState({ hasError: false })}
                className="rounded-xl bg-uhc-blue px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-uhc-blue-mid"
              >
                Try Again
              </button>
            </div>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
