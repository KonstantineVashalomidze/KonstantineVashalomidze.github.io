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
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${props => props.theme.spacing.md};
  list-style: none;
  padding: 0;
`;

const SkillItem = styled.li`
  background: white;
  padding: ${props => props.theme.spacing.md};
  border: 2px solid ${props => props.theme.colors.primary};
  
  &:hover {
    box-shadow: ${props => props.theme.shadows.main};
  }
`;

const SkillName = styled.div`
  font-family: ${props => props.theme.fonts.mono};
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const SkillBar = styled.div`
  height: 8px;
  background: ${props => props.theme.colors.secondary}30;
  border-radius: 4px;
  overflow: hidden;
  margin-top: ${props => props.theme.spacing.xs};
`;

const SkillLevel = styled.div`
  height: 100%;
  width: ${props => props.level}%;
  background: ${props => props.theme.colors.primary};
  transition: width 0.3s ease;
`;

const SkillLevelText = styled.span`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.secondary};
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

const SupportButton = styled(ContactItem)`
  text-align: center;
  background: ${props => props.theme.colors.primary};
  color: white;
  font-weight: bold;
  
  &:hover {
    background: white;
    color: ${props => props.theme.colors.primary};
    transform: translateY(-2px);
    transition: all 0.2s ease-in-out;
  }
`;

const ResumeButton = styled(ContactItem)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};
  background: white;
  font-weight: bold;
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const CertificateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.md};
`;

const CertificateItem = styled.a`
  display: flex;
  flex-direction: column;
  padding: ${props => props.theme.spacing.md};
  border: 2px solid ${props => props.theme.colors.primary};
  text-decoration: none;
  color: ${props => props.theme.colors.primary};
  background: white;
  
  &:hover {
    box-shadow: ${props => props.theme.shadows.main};
    transform: translateY(-2px);
    transition: all 0.2s ease-in-out;
  }
`;

const CertificateName = styled.h3`
  font-size: ${props => props.theme.fontSizes.lg};
  margin-bottom: ${props => props.theme.spacing.xs};
  color: ${props => props.theme.colors.primary};
`;

const CertificateIssuer = styled.div`
  font-family: ${props => props.theme.fonts.mono};
  color: ${props => props.theme.colors.secondary};
  font-size: ${props => props.theme.fontSizes.sm};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const CertificateDate = styled.div`
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.secondary};
`;

const getSkillLevelLabel = (level) => {
  if (level >= 90) return "Expert";
  if (level >= 80) return "Advanced";
  if (level >= 70) return "Proficient";
  if (level >= 50) return "Intermediate";
  return "Beginner";
};

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
        <SectionTitle>Contact & Resources</SectionTitle>
        <ContactGrid>
          <ContactItem 
            href={`mailto:${personalInfo.contact.email}`} 
            style={{ 
              wordBreak: 'break-all',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {personalInfo.contact.email}
          </ContactItem>
          <ContactItem href={`tel:${personalInfo.contact.phone}`}>
            {personalInfo.contact.phone}
          </ContactItem>
          <ResumeButton 
            href={personalInfo.resumeUrl} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 4V2h10v2h5v18H2V4h5zM4 6v14h16V6H4zm7 5h6v2h-6v-2zm0 4h6v2h-6v-2zM7 7h4v4H7V7z"/>
            </svg>
            View Resume
          </ResumeButton>
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
            <SkillItem key={index}>
              <SkillName>{skill.name}</SkillName>
              <SkillBar>
                <SkillLevel level={skill.level} />
              </SkillBar>
              <SkillLevelText>
                {skill.level}% - {getSkillLevelLabel(skill.level)}
              </SkillLevelText>
            </SkillItem>
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

      <Section>
        <SectionTitle>Certificates</SectionTitle>
        <CertificateGrid>
          {personalInfo.certificates.map((cert, index) => (
            <CertificateItem 
              key={index}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <CertificateName>{cert.name}</CertificateName>
              <CertificateIssuer>{cert.issuer}</CertificateIssuer>
              <CertificateDate>{cert.date}</CertificateDate>
            </CertificateItem>
          ))}
        </CertificateGrid>
      </Section>

      <Section>
        <SectionTitle>Support My Work</SectionTitle>
        <ContactGrid>
          <SupportButton
            href="https://www.paypal.com/paypalme/mamaafrica9988"
            target="_blank"
            rel="noopener noreferrer"
          >
            Support via PayPal
          </SupportButton>
        </ContactGrid>
      </Section>
    </AboutContainer>
  );
}

export default About; 