import React, { useState } from 'react';
import { GlobalStyle } from './global-styles';
import styled from 'styled-components';
import { Emotion } from './interfaces';
import { getAPIManager } from './api';

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
const Header = styled('header')<{ toggleState: boolean }>`
  background: linear-gradient(#eee, #333);
  -webkit-background-clip: text;
  background-clip: text;
  color: ${({ toggleState }) => (toggleState ? 'grey' : undefined)};
  transition: 0.5s ease-in-out;
  font-size: 3rem;
  font-weight: 900;
  text-transform: uppercase;
`;

const Textarea = styled.input`
  font-size: 1.2rem;
  border: none;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.5);
  min-width: 15rem;
  text-align: center;
  margin: 0.5rem 0;
  padding-bottom: 0.5rem;
  &:focus {
    outline: none;
  }
`;

const SliderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 10rem;
`;

const Result = styled.div`
  text-align: center;
`;

const PresetContainer = styled.div`
  margin: 0.5rem 0;
`;

const PresetButton = styled.button<{ toggleState: boolean }>`
  border: 0.5px solid rgba(0, 0, 0, 0.5);
  border-radius: 0.2rem;
  padding: 0.25rem 1rem 0.2rem 1rem;
  margin: 0 0.2rem;
  background-color: ${({ toggleState }) => (toggleState ? '#d1edff' : 'white')};
`;

const SubmitButton = styled.button`
  border: 0.5px solid rgba(0, 0, 0, 0.5);
  border-radius: 0.2rem;
  padding: 0.25rem 1rem 0.2rem 1rem;
`;

// This is example of react-hooks with TypeScript
function useToggle(defaultValue: boolean) {
  const [toggleState, setToggleState] = useState(defaultValue);

  function onMouseOver() {
    setToggleState(true);
  }

  function onMouseOut() {
    setToggleState(false);
  }

  return { toggleState, onMouseOver, onMouseOut };
}

const useInput = (initialValue: string, placeholder: string) => {
  const [value, setValue] = useState(initialValue);
  const onChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setValue(value);
  };

  return { value, placeholder, onChange };
};

const useSelect = (initialEmotion: Emotion) => {
  const [emotion, setEmotion] = useState(initialEmotion);
  return { emotion, setEmotion };
};

const api = getAPIManager(process.env.REACT_APP_API_HOST);
api.setupToken();

function App() {
  const toggle = useToggle(false);
  const sentenceProps = useInput('', 'enter the sentence');

  const selection = useSelect(Emotion.NEUTRAL);

  const [audioURL, setAudioURL] = useState('/');
  const handleOnSubmit = async () => {
    const filename = await api.requestTTS(
      sentenceProps.value,
      selection.emotion,
    );
    setAudioURL(api.getAudioURL(filename));
  };

  return (
    <>
      <GlobalStyle />
      <Container className="App">
        <Header {...toggle} className="App-header">
          EmotiVoice
        </Header>
        <Textarea {...sentenceProps} />
        <PresetContainer>
          <PresetButton
            toggleState={selection.emotion === Emotion.NEUTRAL}
            onClick={() => selection.setEmotion(Emotion.NEUTRAL)}
          >
            neutral
          </PresetButton>
          <PresetButton
            toggleState={selection.emotion === Emotion.HAPPY}
            onClick={() => selection.setEmotion(Emotion.HAPPY)}
          >
            happy
          </PresetButton>
          <PresetButton
            toggleState={selection.emotion === Emotion.SAD}
            onClick={() => selection.setEmotion(Emotion.SAD)}
          >
            sad
          </PresetButton>
          <PresetButton
            toggleState={selection.emotion === Emotion.ANGRY}
            onClick={() => selection.setEmotion(Emotion.ANGRY)}
          >
            angry
          </PresetButton>
        </PresetContainer>
        <SubmitButton onClick={() => handleOnSubmit()}>Submit</SubmitButton>
        <audio controls src={audioURL} style={{ marginTop: '10px' }}></audio>
      </Container>
    </>
  );
}

export default App;
