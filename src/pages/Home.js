import React from 'react';
import styled from '@emotion/styled';
import ProjectCard from '../components/projects/ProjectCard';
import BlogPreview from '../components/blogs/BlogPreview';
import { projects } from '../data/projects';
import { blogs } from '../data/blogs';

const HomeContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.md};
`;

const Hero = styled.section`
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

const Subtitle = styled.p`
  font-size: ${props => props.theme.fontSizes.lg};
  color: ${props => props.theme.colors.secondary};
`;

const SectionTitle = styled.h2`
  font-size: ${props => props.theme.fontSizes.xl};
  margin-bottom: ${props => props.theme.spacing.lg};
  padding-bottom: ${props => props.theme.spacing.xs};
  border-bottom: 2px solid ${props => props.theme.colors.primary};
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const BlogsSection = styled.section`
  margin-bottom: 4rem;
`;

function Home() {
  // Use the first two projects from the data
  const featuredProjects = projects.slice(0, 2);
  
  // Use the first two blogs from the data
  const recentBlogs = blogs.slice(0, 2);

  return (
    <HomeContainer>
      <Hero>
        <Title>Welcome to My Portfolio</Title>
        <Subtitle>Full-stack developer crafting digital experiences</Subtitle>
      </Hero>

      <section>
        <SectionTitle>Latest Projects</SectionTitle>
        <ProjectsGrid>
          {featuredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </ProjectsGrid>
      </section>

      <BlogsSection>
        <SectionTitle>Recent Blog Posts</SectionTitle>
        {recentBlogs.map(blog => (
          <BlogPreview key={blog.id} blog={blog} />
        ))}
      </BlogsSection>
    </HomeContainer>
  );
}

export default Home; 