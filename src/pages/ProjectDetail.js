import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { projects } from '../data/projects';
import ImageGallery from '../components/projects/ImageGallery';

const ProjectContainer = styled.div`
  padding: ${props => props.theme.spacing.md};
`;

const BackButton = styled(Link)`
  display: inline-block;
  background: white;
  color: ${props => props.theme.colors.primary};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.md};
  font-family: ${props => props.theme.fonts.mono};
  font-size: ${props => props.theme.fontSizes.md};
  border: 2px solid ${props => props.theme.colors.primary};
  text-decoration: none;
  margin-bottom: ${props => props.theme.spacing.lg};

  &:hover {
    background: ${props => props.theme.colors.primary};
    color: white;
    box-shadow: ${props => props.theme.shadows.main};
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border: 2px solid ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const Title = styled.h1`
  margin-bottom: ${props => props.theme.spacing.md};
`;

const TagContainer = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.lg};
  flex-wrap: wrap;
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

const Section = styled.section`
  margin-bottom: ${props => props.theme.spacing.lg};
  padding: ${props => props.theme.spacing.lg};
  border: 2px solid ${props => props.theme.colors.primary};
  background: white;

  &:hover {
    box-shadow: ${props => props.theme.shadows.main};
  }
`;

const SectionTitle = styled.h2`
  margin-bottom: ${props => props.theme.spacing.md};
  font-size: ${props => props.theme.fontSizes.xl};
`;

const List = styled.ul`
  list-style-position: inside;
  margin-left: ${props => props.theme.spacing.md};
`;

const ListItem = styled.li`
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const LinkButton = styled.a`
  display: inline-block;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  margin-right: ${props => props.theme.spacing.md};
  border: 1px solid ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  background: white;

  &:hover {
    background: ${props => props.theme.colors.background};
    box-shadow: ${props => props.theme.shadows.main};
    text-decoration: none;
  }
`;

function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find(p => p.id === parseInt(id));

  if (!project) {
    return (
      <div className="main-content">
        <h1>Project Not Found</h1>
        <BackButton to="/projects">← Back to Projects</BackButton>
      </div>
    );
  }

  return (
    <ProjectContainer>
      <BackButton to="/projects">← Back to Projects</BackButton>
      
      <ProjectImage src={project.image} alt={project.title} />
      <Title>{project.title}</Title>
      
      <TagContainer>
        {project.tags.map((tag, index) => (
          <Tag key={index}>{tag}</Tag>
        ))}
      </TagContainer>

      <Section>
        <SectionTitle>Overview</SectionTitle>
        <p>{project.overview}</p>
      </Section>

      {project.gallery && (
        <Section>
          <SectionTitle>Project Gallery</SectionTitle>
          <ImageGallery images={project.gallery} />
        </Section>
      )}

      <Section>
        <SectionTitle>Features</SectionTitle>
        <List>
          {project.features.map((feature, index) => (
            <ListItem key={index}>{feature}</ListItem>
          ))}
        </List>
      </Section>

      <Section>
        <SectionTitle>Technologies Used</SectionTitle>
        <List>
          {project.technologies.map((tech, index) => (
            <ListItem key={index}>{tech}</ListItem>
          ))}
        </List>
      </Section>

      <Section>
        <LinkButton href={project.github} target="_blank" rel="noopener noreferrer">
          View on GitHub
        </LinkButton>
        <LinkButton href={project.demo} target="_blank" rel="noopener noreferrer">
          Live Demo
        </LinkButton>
      </Section>
    </ProjectContainer>
  );
}

export default ProjectDetail; 