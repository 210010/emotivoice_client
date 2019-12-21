import React, { useState, useEffect } from 'react';
import { GlobalStyle } from './global-styles';
import styled from 'styled-components';
import WelcomeImage from './assets/welcome.png';
import PassiveExample from './components/PassiveExample';
import ActiveExample from './components/ActiveExample';
import Explanation from './components/Explanation';
import Insideout from './assets/insideout.png';

// This is example of styled-components
const Container = styled.main`
  min-height: 100vh;
  width: 100%;
  min-width: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

// This is example of styled-components with TypeScript or you can make interface of props
const Header = styled.header`
  -webkit-background-clip: text;
  background-clip: text;
  transition: 0.5s ease-in-out;
  font-size: 5rem;
  text-align: center;
  font-weight: 900;
  text-shadow: 0px 4px 0px white;
  background-image: linear-gradient(
    to left,
    violet,
    indigo,
    blue,
    green,
    yellow,
    orange,
    red
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: absolute;
  bottom: 5rem;
  left: 50%;
  transform: translateX(-50%);
`;

const Welcome = styled.img`
  height: 10rem;
`;

const MainImage = styled.img`
  width: 25rem;
  z-index: 0;
`;

const LogoContainer = styled.div`
  position: relative;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Container className="App">
        <LogoContainer>
          <MainImage src={Insideout} />
          <Header className="App-header">EmotiVoice</Header>
        </LogoContainer>
        <Explanation />
        <PassiveExample />
        <ActiveExample />
      </Container>
    </>
  );
}

export default App;
