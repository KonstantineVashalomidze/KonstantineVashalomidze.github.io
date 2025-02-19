import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

const BlogCard = styled.div`
  background: white;
  border: 2px solid ${props => props.theme.colors.primary};
  padding: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.md};

  &:hover {
    box-shadow: ${props => props.theme.shadows.main};
  }
`;

const BlogTitle = styled.h3`
  font-family: ${props => props.theme.fonts.mono};
  font-size: ${props => props.theme.fontSizes.lg};
  margin-bottom: ${props => props.theme.spacing.xs};
  color: ${props => props.theme.colors.primary};
`;

const BlogDate = styled.span`
  color: ${props => props.theme.colors.secondary};
  font-family: ${props => props.theme.fonts.mono};
  font-size: ${props => props.theme.fontSizes.sm};
  display: block;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const BlogExcerpt = styled.p`
  font-size: ${props => props.theme.fontSizes.md};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const ReadMoreLink = styled(Link)`
  display: inline-block;
  background: white;
  color: ${props => props.theme.colors.primary};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.md};
  font-family: ${props => props.theme.fonts.mono};
  font-size: ${props => props.theme.fontSizes.sm};
  border: 2px solid ${props => props.theme.colors.primary};
  text-decoration: none;
  
  &:hover {
    background: ${props => props.theme.colors.primary};
    color: white;
    box-shadow: ${props => props.theme.shadows.main};
  }
`;

function BlogPreview({ blog }) {
  return (
    <BlogCard>
      <BlogTitle>{blog.title}</BlogTitle>
      <BlogDate>{new Date(blog.date).toLocaleDateString()}</BlogDate>
      <BlogExcerpt>{blog.excerpt}</BlogExcerpt>
      <ReadMoreLink to={`/blogs/${blog.id}`}>Read more →</ReadMoreLink>
    </BlogCard>
  );
}

export default BlogPreview; 