import React from 'react';
import styled from '@emotion/styled';
import Markdown from 'markdown-to-jsx';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

const ContentContainer = styled.div`
  font-size: ${props => props.theme.fontSizes.md};
  line-height: 1.6;

  h1, h2, h3, h4, h5, h6 {
    font-family: ${props => props.theme.fonts.mono};
    color: ${props => props.theme.colors.primary};
    margin: ${props => props.theme.spacing.lg} 0 
            ${props => props.theme.spacing.md};
  }

  p {
    margin-bottom: ${props => props.theme.spacing.md};
  }

  ul, ol {
    margin: ${props => props.theme.spacing.md} 0;
    padding-left: ${props => props.theme.spacing.lg};
  }

  li {
    margin-bottom: ${props => props.theme.spacing.xs};
  }
`;

const ImageContainer = styled.div`
  margin: ${props => props.theme.spacing.lg} 0;
  border: 2px solid ${props => props.theme.colors.primary};
  padding: ${props => props.theme.spacing.sm};
  background: white;

  &:hover {
    box-shadow: ${props => props.theme.shadows.main};
  }

  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

const ImageCaption = styled.em`
  display: block;
  text-align: center;
  color: ${props => props.theme.colors.secondary};
  font-family: ${props => props.theme.fonts.mono};
  font-size: ${props => props.theme.fontSizes.sm};
  margin-top: ${props => props.theme.spacing.sm};
`;

const CodeBlock = styled.div`
  margin: ${props => props.theme.spacing.lg} 0;
  border: 2px solid ${props => props.theme.colors.primary};

  &:hover {
    box-shadow: ${props => props.theme.shadows.main};
  }
`;

function BlogContent({ content }) {
  return (
    <ContentContainer>
      <Markdown
        options={{
          overrides: {
            img: {
              component: ({ alt, src }) => (
                <ImageContainer>
                  <img src={src} alt={alt} />
                  {alt && <ImageCaption>{alt}</ImageCaption>}
                </ImageContainer>
              ),
            },
            code: {
              component: ({ className, children }) => {
                const language = className ? className.replace('lang-', '') : 'text';
                return (
                  <CodeBlock>
                    <SyntaxHighlighter
                      language={language}
                      style={tomorrow}
                      customStyle={{
                        margin: 0,
                        borderRadius: 0,
                        background: '#2d334a',
                      }}
                    >
                      {children}
                    </SyntaxHighlighter>
                  </CodeBlock>
                );
              },
            },
          },
        }}
      >
        {content}
      </Markdown>
    </ContentContainer>
  );
}

export default BlogContent; 