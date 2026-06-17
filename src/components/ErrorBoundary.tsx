import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    (this as unknown as { state: State }).state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render(): ReactNode {
    const { hasError } = (this as unknown as { state: State }).state;
    const { children } = (this as unknown as { props: Readonly<Props> }).props;

    if (hasError) {
      const resetError = () => {
        (
          this as unknown as {
            setState: (s: Partial<State>) => void;
          }
        ).setState({ hasError: false });
      };

      return (
        <div className="flex-grow w-full min-h-screen bg-cream-bg flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <h1 className="text-2xl font-bold text-brown-dark mb-3">
              Something went wrong
            </h1>
            <p className="text-brown-light mb-6">
              An unexpected error occurred. Please try refreshing the page.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={resetError}
                className="bg-sand hover:bg-salmon text-white px-6 py-3 rounded-xl font-bold transition-all duration-300"
              >
                Try Again
              </button>
              <button
                onClick={() => window.location.reload()}
                className="bg-moccasin hover:bg-sand text-brown-dark px-6 py-3 rounded-xl font-bold transition-all duration-300"
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
