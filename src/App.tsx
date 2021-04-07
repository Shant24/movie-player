import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';

import Player from './components/Player';
import InputField from './components/InputField';

type MoviePlayerContainerProps = {
  minHeight: number;
};

const MoviePlayerContainer = styled.div<MoviePlayerContainerProps>`
  padding: 20px 20px 20px;
  width: 100%;
  min-height: ${({ minHeight }) => minHeight}px;
  height: 100%;
  font-family: 'Nunito';
`;

const Title = styled.h1`
  color: white;
  text-align: center;
  font-size: 50px;

  @media (max-width: 1280px) {
    font-size: 40px;
  }

  @media (max-width: 768px) {
    font-size: 30;
  }
`;

const App: React.FC = () => {
  const [videoLink, setVideoLink] = useState<string>('');
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [error, setError] = useState<string | null>(null);

  const onResize = () => setWindowHeight(window.innerHeight);

  useEffect(() => {
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <MoviePlayerContainer minHeight={windowHeight}>
      <Title>Put Your Movie Link (MP4)</Title>

      <InputField setVideoLink={setVideoLink} />

      {error}

      {videoLink && <Player src={videoLink} setError={setError} />}
    </MoviePlayerContainer>
  );
};

export default App;
