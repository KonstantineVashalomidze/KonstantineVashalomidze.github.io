import React from 'react';
import styled from '@emotion/styled';
import BlogPreview from '../components/blogs/BlogPreview';
import { blogs } from '../data/blogs';

const BlogsContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.md};
`;

const Header = styled.section`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xl};
  padding: ${props => props.theme.spacing.lg};
  border: 2px solid ${props => props.theme.colors.primary};
  background: white;
  
  &:hover {
    box-shadow: ${props => props.theme.shadows.main};
  }
`;

const Title = styled.h1`
  font-size: ${props => props.theme.fontSizes['2xl']};
  margin-bottom: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.primary};
`;

const Description = styled.p`
  font-size: ${props => props.theme.fontSizes.lg};
  color: ${props => props.theme.colors.secondary};
`;

const BlogsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
`;

function Blogs() {
  return (
    <BlogsContainer>
      <Header>
        <Title>Blog Posts</Title>
        <Description>Thoughts, tutorials and insights</Description>
      </Header>
      
      <BlogsList>
        {blogs.map(blog => (
          <BlogPreview key={blog.id} blog={blog} />
        ))}
      </BlogsList>
    </BlogsContainer>
  );
}

export default Blogs; 