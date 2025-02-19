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
  flex-direction: column;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.md};
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

const Copyright = styled.p`
  font-size: ${props => props.theme.fontSizes.sm};
  text-align: center;
`;

function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <SocialLinks>
          <SocialLink 
            href={personalInfo.platforms.GitHub}
            target="_blank" 
            rel="noopener noreferrer"
          >
            GitHub
          </SocialLink>
          <SocialLink 
            href={personalInfo.platforms.LinkedIn}
            target="_blank" 
            rel="noopener noreferrer"
          >
            LinkedIn
          </SocialLink>
          <SocialLink 
            href={personalInfo.platforms.Leetcode}
            target="_blank" 
            rel="noopener noreferrer"
          >
            LeetCode
          </SocialLink>
          <SocialLink 
            href={personalInfo.platforms.Hackerrank}
            target="_blank" 
            rel="noopener noreferrer"
          >
            HackerRank
          </SocialLink>
        </SocialLinks>
        <Copyright>
          © {new Date().getFullYear()} Konstantine Vashalomidze. All rights reserved.
        </Copyright>
      </FooterContent>
    </FooterContainer>
  );
}

export default Footer; 