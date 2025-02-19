import React from 'react';
import styled from '@emotion/styled';

const ErrorContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  text-align: center;
  background: ${props => props.theme.colors.background};
  border-radius: 8px;
`;

const ErrorTitle = styled.h2`
  color: ${props => props.theme.colors.accent};
  margin-bottom: 1rem;
`;

const ErrorMessage = styled.p`
  margin-bottom: 1rem;
`;

const ReloadButton = styled.button`
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    opacity: 0.9;
  }
`;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service here
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <ErrorTitle>Oops! Something went wrong</ErrorTitle>
          <ErrorMessage>
            {this.state.error?.message || 'An unexpected error occurred'}
          </ErrorMessage>
          <ReloadButton onClick={this.handleReload}>
            Reload Page
          </ReloadButton>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 