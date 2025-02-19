import React from 'react';
import styled from '@emotion/styled';
import ProjectCard from '../components/projects/ProjectCard';
import { projects } from '../data/projects';

const ProjectsContainer = styled.div`
  max-width: 1200px;
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

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

function Projects() {
  return (
    <ProjectsContainer>
      <Header>
        <Title>My Projects</Title>
        <Description>A collection of my work and side projects</Description>
      </Header>
      
      <ProjectsGrid>
        {projects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </ProjectsGrid>
    </ProjectsContainer>
  );
}

export default Projects; 