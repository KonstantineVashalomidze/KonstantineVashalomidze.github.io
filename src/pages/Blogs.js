import React from 'react';
import styled from '@emotion/styled';
import BlogPreview from '../components/blogs/BlogPreview';
import { blogs } from '../data/blogs';

const BlogsContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.secondary};
`;

const BlogsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
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