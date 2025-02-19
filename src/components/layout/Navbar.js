import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

const NavContainer = styled.nav`
  background-color: ${props => props.theme.colors.primary};
  padding: ${props => props.theme.spacing.md};
  border-bottom: 2px solid ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  gap: ${props => props.theme.spacing.lg};
  max-width: 800px;
  margin: 0 auto;
  justify-content: center;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: center;
    gap: ${props => props.theme.spacing.sm};
  }
`;

const NavItem = styled.li`
  font-family: ${props => props.theme.fonts.main};
  font-size: ${props => props.theme.fontSizes.md};
  
  a {
    color: white;
    text-decoration: none;
    padding: ${props => props.theme.spacing.xs};
    
    &:hover {
      color: ${props => props.theme.colors.accent};
      text-decoration: underline;
    }
  }
`;

function Navbar() {
  return (
    <NavContainer>
      <NavList>
        <NavItem>
          <Link to="/">Home</Link>
        </NavItem>
        <NavItem>
          <Link to="/projects">Projects</Link>
        </NavItem>
        <NavItem>
          <Link to="/blogs">Blogs</Link>
        </NavItem>
        <NavItem>
          <Link to="/about">About</Link>
        </NavItem>
      </NavList>
    </NavContainer>
  );
}

export default Navbar; 