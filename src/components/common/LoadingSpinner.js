import React from 'react';
import styled from '@emotion/styled';

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid ${props => props.theme.colors.background};
  border-top-color: ${props => props.theme.colors.accent};
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

function LoadingSpinner() {
  return (
    <SpinnerContainer>
      <Spinner />
    </SpinnerContainer>
  );
}

export default LoadingSpinner; 