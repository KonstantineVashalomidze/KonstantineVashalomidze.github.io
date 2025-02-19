import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

const Card = styled.div`
  background: white;
  border: 2px solid ${props => props.theme.colors.primary};
  padding: ${props => props.theme.spacing.md};
  transition: transform 0.3s ease;

  &:hover {
    box-shadow: ${props => props.theme.shadows.main};
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border: 2px solid ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.sm};
  
  &:hover {
    opacity: 0.9;
  }
`;

const ProjectTitle = styled.h3`
  font-family: ${props => props.theme.fonts.mono};
  font-size: ${props => props.theme.fontSizes.lg};
  margin-bottom: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.primary};
`;

const ProjectDescription = styled.p`
  font-size: ${props => props.theme.fontSizes.md};
  color: ${props => props.theme.colors.secondary};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const TagContainer = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.xs};
  flex-wrap: wrap;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const Tag = styled.span`
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  font-family: ${props => props.theme.fonts.mono};
  font-size: ${props => props.theme.fontSizes.sm};
  border: 2px solid ${props => props.theme.colors.primary};

  &:hover {
    background: white;
    color: ${props => props.theme.colors.primary};
  }
`;

const ViewButton = styled(Link)`
  display: inline-block;
  background: white;
  color: ${props => props.theme.colors.primary};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.md};
  font-family: ${props => props.theme.fonts.mono};
  font-size: ${props => props.theme.fontSizes.md};
  border: 2px solid ${props => props.theme.colors.primary};
  text-decoration: none;

  &:hover {
    background: ${props => props.theme.colors.primary};
    color: white;
    box-shadow: ${props => props.theme.shadows.main};
  }
`;

function ProjectCard({ project }) {
  return (
    <Card>
      <ProjectImage src={project.image} alt={project.title} />
      <ProjectTitle>{project.title}</ProjectTitle>
      <ProjectDescription>{project.description}</ProjectDescription>
      <TagContainer>
        {project.tags.map((tag, index) => (
          <Tag key={index}>{tag}</Tag>
        ))}
      </TagContainer>
      <ViewButton to={`/projects/${project.id}`}>View Project</ViewButton>
    </Card>
  );
}

export default ProjectCard; 