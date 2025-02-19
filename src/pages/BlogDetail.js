import React from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from '@emotion/styled';
import Markdown from 'markdown-to-jsx';
import { blogs } from '../data/blogs';
import BlogContent from '../components/blogs/BlogContent';

const BlogContainer = styled.div`
  padding: ${props => props.theme.spacing.md};
`;

const BackButton = styled(Link)`
  display: inline-block;
  margin-bottom: ${props => props.theme.spacing.lg};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border: 1px solid ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.primary};
  text-decoration: none;

  &:hover {
    background: ${props => props.theme.colors.background};
    box-shadow: 2px 2px 0 ${props => props.theme.colors.primary};
    text-decoration: none;
  }
`;

const BlogHeader = styled.header`
  margin-bottom: ${props => props.theme.spacing.xl};
  padding: ${props => props.theme.spacing.md};
  border: 1px solid ${props => props.theme.colors.primary};
  background: white;

  &:hover {
    box-shadow: ${props => props.theme.shadows.main};
  }
`;

const Title = styled.h1`
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const DateText = styled.p`
  color: ${props => props.theme.colors.secondary};
  font-size: ${props => props.theme.fontSizes.sm};
`;

const Content = styled.div`
  font-size: ${props => props.theme.fontSizes.md};
  line-height: 1.8;
  padding: ${props => props.theme.spacing.md};
  border: 1px solid ${props => props.theme.colors.primary};
  background: white;

  &:hover {
    box-shadow: ${props => props.theme.shadows.main};
  }

  h1, h2, h3, h4, h5, h6 {
    margin: ${props => props.theme.spacing.lg} 0 ${props => props.theme.spacing.md};
    color: ${props => props.theme.colors.primary};
  }

  p {
    margin-bottom: ${props => props.theme.spacing.md};
  }

  code {
    background: ${props => props.theme.colors.background};
    padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
    border: 1px solid ${props => props.theme.colors.primary};
    font-family: ${props => props.theme.fonts.mono};
  }

  pre {
    background: ${props => props.theme.colors.primary};
    color: white;
    padding: ${props => props.theme.spacing.md};
    overflow-x: auto;
    margin: ${props => props.theme.spacing.md} 0;
    border: 1px solid ${props => props.theme.colors.primary};

    code {
      background: none;
      padding: 0;
      border: none;
      color: white;
    }
  }

  ul, ol {
    margin: ${props => props.theme.spacing.md} 0;
    padding-left: ${props => props.theme.spacing.lg};
  }

  li {
    margin-bottom: ${props => props.theme.spacing.xs};
  }
`;

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

function BlogDetail() {
  const { id } = useParams();
  const blog = blogs.find(b => b.id === parseInt(id));

  if (!blog) {
    return (
      <div className="main-content">
        <h1>Blog Post Not Found</h1>
        <BackButton to="/blogs">← Back to Blogs</BackButton>
      </div>
    );
  }

  return (
    <BlogContainer>
      <BackButton to="/blogs">← Back to Blogs</BackButton>
      
      <BlogHeader>
        <Title>{blog.title}</Title>
        <DateText>{formatDate(blog.date)}</DateText>
      </BlogHeader>

      <Content>
        <BlogContent content={blog.content} />
      </Content>
    </BlogContainer>
  );
}

export default BlogDetail; 