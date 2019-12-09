import React, { useState, useEffect } from 'react';
import { GlobalStyle } from './global-styles';
import styled from 'styled-components';
import WelcomeImage from './assets/welcome.png';
import PassiveExample from './components/PassiveExample';
import ActiveExample from './components/ActiveExample';
import Explanation from './components/Explanation';

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
  background: linear-gradient(#eee, #333);
  margin: 5rem;
  -webkit-background-clip: text;
  background-clip: text;
  transition: 0.5s ease-in-out;
  font-size: 4rem;
  font-weight: 900;
  text-shadow: 0px 4px 0px black;
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
`;

const Welcome = styled.img`
  height: 10rem;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Container className="App">
        <Header className="App-header">EmotiVoice</Header>
        <Welcome src={WelcomeImage} />
        <Explanation />
        <PassiveExample />
        <ActiveExample />
      </Container>
    </>
  );
}

export default App;
