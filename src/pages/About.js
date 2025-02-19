import React from 'react';
import styled from '@emotion/styled';
import { personalInfo } from '../data/personal';

const AboutContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.md};
`;

const ProfileSection = styled.section`
  display: flex;
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xl};
  padding: ${props => props.theme.spacing.lg};
  border: 2px solid ${props => props.theme.colors.primary};
  background: white;
  
  &:hover {
    box-shadow: ${props => props.theme.shadows.main};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const ProfileImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  border: 2px solid ${props => props.theme.colors.primary};
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const Name = styled.h1`
  font-size: ${props => props.theme.fontSizes['2xl']};
  margin-bottom: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.primary};
`;

const Location = styled.p`
  color: ${props => props.theme.colors.secondary};
  font-family: ${props => props.theme.fonts.mono};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const Bio = styled.p`
  font-size: ${props => props.theme.fontSizes.md};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const Section = styled.section`
  margin-bottom: ${props => props.theme.spacing.xl};
  padding: ${props => props.theme.spacing.lg};
  border: 2px solid ${props => props.theme.colors.primary};
  background: white;

  &:hover {
    box-shadow: ${props => props.theme.shadows.main};
  }
`;

const SectionTitle = styled.h2`
  font-size: ${props => props.theme.fontSizes.xl};
  margin-bottom: ${props => props.theme.spacing.lg};
  padding-bottom: ${props => props.theme.spacing.xs};
  border-bottom: 2px solid ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.primary};
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${props => props.theme.spacing.md};
`;

const ContactItem = styled.a`
  display: block;
  padding: ${props => props.theme.spacing.md};
  border: 2px solid ${props => props.theme.colors.primary};
  background: white;
  text-decoration: none;
  color: ${props => props.theme.colors.primary};
  font-family: ${props => props.theme.fonts.mono};
  
  &:hover {
    background: ${props => props.theme.colors.primary};
    color: white;
    box-shadow: ${props => props.theme.shadows.main};
  }
`;

const PlatformGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${props => props.theme.spacing.md};
`;

const PlatformLink = styled.a`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.sm};
  border: 2px solid ${props => props.theme.colors.primary};
  text-decoration: none;
  color: ${props => props.theme.colors.primary};
  font-family: ${props => props.theme.fonts.mono};
  
  &:hover {
    background: ${props => props.theme.colors.primary};
    color: white;
    box-shadow: ${props => props.theme.shadows.main};
  }
`;

const SkillsList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.sm};
  list-style: none;
`;

const Skill = styled.li`
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border: 2px solid ${props => props.theme.colors.primary};
  font-family: ${props => props.theme.fonts.mono};
  font-size: ${props => props.theme.fontSizes.sm};
  
  &:hover {
    background: white;
    color: ${props => props.theme.colors.primary};
  }
`;

const ExperienceItem = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
  padding: ${props => props.theme.spacing.md};
  border: 2px solid ${props => props.theme.colors.primary};
  background: white;

  &:hover {
    box-shadow: ${props => props.theme.shadows.main};
  }

  h3 {
    font-size: ${props => props.theme.fontSizes.lg};
    color: ${props => props.theme.colors.primary};
    margin-bottom: ${props => props.theme.spacing.xs};
  }

  .period {
    color: ${props => props.theme.colors.secondary};
    font-family: ${props => props.theme.fonts.mono};
    font-size: ${props => props.theme.fontSizes.sm};
    margin-bottom: ${props => props.theme.spacing.sm};
  }

  .description {
    font-size: ${props => props.theme.fontSizes.md};
  }
`;

function About() {
  return (
    <AboutContainer>
      <ProfileSection>
        <ProfileImage src={personalInfo.profileImage} alt={personalInfo.name} />
        <ProfileInfo>
          <Name>{personalInfo.name}</Name>
          <Location>{personalInfo.location}</Location>
          <Bio>{personalInfo.bio}</Bio>
        </ProfileInfo>
      </ProfileSection>

      <Section>
        <SectionTitle>Contact</SectionTitle>
        <ContactGrid>
          <ContactItem href={`mailto:${personalInfo.contact.email}`}>
            ✉️ {personalInfo.contact.email}
          </ContactItem>
          <ContactItem href={`tel:${personalInfo.contact.phone}`}>
            📞 {personalInfo.contact.phone}
          </ContactItem>
        </ContactGrid>
      </Section>

      <Section>
        <SectionTitle>Find Me Online</SectionTitle>
        <PlatformGrid>
          {Object.entries(personalInfo.platforms).map(([platform, url]) => (
            <PlatformLink 
              key={platform} 
              href={url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {platform}
            </PlatformLink>
          ))}
        </PlatformGrid>
      </Section>

      <Section>
        <SectionTitle>Skills</SectionTitle>
        <SkillsList>
          {personalInfo.skills.map((skill, index) => (
            <Skill key={index}>{skill}</Skill>
          ))}
        </SkillsList>
      </Section>

      <Section>
        <SectionTitle>Experience</SectionTitle>
        {personalInfo.experience.map((exp, index) => (
          <ExperienceItem key={index}>
            <h3>{exp.company}</h3>
            <p className="period">{exp.position} • {exp.period}</p>
            <p className="description">{exp.description}</p>
          </ExperienceItem>
        ))}
      </Section>

      <Section>
        <SectionTitle>Education</SectionTitle>
        {personalInfo.education.map((edu, index) => (
          <ExperienceItem key={index}>
            <h3>{edu.institution}</h3>
            <p className="period">{edu.degree} • {edu.period}</p>
            <p className="description">{edu.description}</p>
          </ExperienceItem>
        ))}
      </Section>
    </AboutContainer>
  );
}

export default About; 