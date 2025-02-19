import React from 'react';
import styled from '@emotion/styled';
import { personalInfo } from '../../data/personal';

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
  display: flex;
  justify-content: center;
  gap: ${props => props.theme.spacing.lg};
`;

const SocialLink = styled.a`
  color: white;
  font-family: ${props => props.theme.fonts.main};
  font-size: ${props => props.theme.fontSizes.md};
  text-decoration: none;
  padding: ${props => props.theme.spacing.xs};
  
  &:hover {
    color: ${props => props.theme.colors.accent};
    text-decoration: underline;
  }
`;

function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <SocialLink 
          href={personalInfo.social.github}
          target="_blank" 
          rel="noopener noreferrer"
        >
          GitHub
        </SocialLink>
        <SocialLink 
          href={personalInfo.social.linkedin}
          target="_blank" 
          rel="noopener noreferrer"
        >
          LinkedIn
        </SocialLink>
        <SocialLink 
          href={personalInfo.social.twitter}
          target="_blank" 
          rel="noopener noreferrer"
        >
          Twitter
        </SocialLink>
      </FooterContent>
    </FooterContainer>
  );
}

export default Footer; 