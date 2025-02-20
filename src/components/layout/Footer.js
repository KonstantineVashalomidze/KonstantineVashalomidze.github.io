import React from 'react';
import styled from '@emotion/styled';

const FooterContainer = styled.footer`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  padding: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.xl};
  border-top: 2px solid ${props => props.theme.colors.primary};
`;

const FooterContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

const Copyright = styled.p`
  font-size: ${props => props.theme.fontSizes.sm};
  padding: ${props => props.theme.spacing.sm};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: ${props => props.theme.fontSizes.xs};
    padding: ${props => props.theme.spacing.xs};
  }
`;

function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <Copyright>
          © {new Date().getFullYear()} Konstantine Vashalomidze. All rights reserved.
        </Copyright>
      </FooterContent>
    </FooterContainer>
  );
}

export default Footer; 