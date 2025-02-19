import React, { useState } from 'react';
import styled from '@emotion/styled';

const GalleryContainer = styled.div`
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const ThumbnailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const Thumbnail = styled.div`
  border: 2px solid ${props => props.theme.colors.primary};
  cursor: pointer;
  
  &:hover {
    box-shadow: ${props => props.theme.shadows.main};
  }

  img {
    width: 100%;
    height: 150px;
    object-fit: cover;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: ${props => props.theme.spacing.md};
  border: 2px solid ${props => props.theme.colors.primary};
  max-width: 90vw;
  max-height: 90vh;
  overflow: auto;
`;

const ModalImage = styled.img`
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
`;

const ModalCaption = styled.p`
  color: ${props => props.theme.colors.primary};
  font-family: ${props => props.theme.fonts.mono};
  text-align: center;
  margin-top: ${props => props.theme.spacing.sm};
`;

const CloseButton = styled.button`
  position: absolute;
  top: ${props => props.theme.spacing.md};
  right: ${props => props.theme.spacing.md};
  background: white;
  border: 2px solid ${props => props.theme.colors.primary};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  cursor: pointer;
  font-family: ${props => props.theme.fonts.mono};
  
  &:hover {
    background: ${props => props.theme.colors.primary};
    color: white;
    box-shadow: ${props => props.theme.shadows.main};
  }
`;

const NavigationButton = styled.button`
  background: white;
  border: 2px solid ${props => props.theme.colors.primary};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  margin: 0 ${props => props.theme.spacing.sm};
  cursor: pointer;
  font-family: ${props => props.theme.fonts.mono};
  
  &:hover {
    background: ${props => props.theme.colors.primary};
    color: white;
    box-shadow: ${props => props.theme.shadows.main};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

function ImageGallery({ images }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <GalleryContainer>
      <ThumbnailGrid>
        {images.map((image, index) => (
          <Thumbnail
            key={image.id}
            onClick={() => {
              setSelectedImage(image);
              setCurrentIndex(index);
            }}
          >
            <img src={image.url} alt={image.caption} />
          </Thumbnail>
        ))}
      </ThumbnailGrid>

      {selectedImage && (
        <ModalOverlay onClick={() => setSelectedImage(null)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={() => setSelectedImage(null)}>×</CloseButton>
            <ModalImage
              src={images[currentIndex].url}
              alt={images[currentIndex].caption}
            />
            <ModalCaption>{images[currentIndex].caption}</ModalCaption>
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              <NavigationButton
                onClick={handlePrev}
                disabled={images.length <= 1}
              >
                ← Previous
              </NavigationButton>
              <NavigationButton
                onClick={handleNext}
                disabled={images.length <= 1}
              >
                Next →
              </NavigationButton>
            </div>
          </ModalContent>
        </ModalOverlay>
      )}
    </GalleryContainer>
  );
}

export default ImageGallery; 