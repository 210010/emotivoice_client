import React, { useState } from 'react';
import { GlobalStyle } from './global-styles';
import styled from 'styled-components';
import { Slider, Icon } from 'antd';
import { Emotion } from './interfaces';

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

const PresetButton = styled.button`
  border: 0.5px solid rgba(0, 0, 0, 0.5);
  border-radius: 0.2rem;
  padding: 0.25rem 1rem 0.2rem 1rem;
  margin: 0 0.2rem;
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

const useSlider = (initialValue: number, min: number, max: number) => {
  const [value, setValue] = useState(initialValue);
  const onChange = (inputValue: any) => {
    setValue(inputValue);
  };
  return { onChange, value, min, max };
};

function App() {
  const toggle = useToggle(false);
  const sentenceProps = useInput('', 'enter the sentence');
  const initialValue = 0;
  const minValue = -50;
  const maxValue = 50;
  const xProps = useSlider(initialValue, minValue, maxValue);
  const yProps = useSlider(initialValue, minValue, maxValue);
  const handleOnSubmit = () => {
    const result = {
      emotion: {
        x: xProps.value,
        y: yProps.value,
      },
      sentence: sentenceProps.value,
    };
    console.log(result);
  };

  const handleOnClickPreset = (emotion: Emotion) => {
    xProps.onChange(emotion.x);
    yProps.onChange(emotion.y);
  };
  return (
    <>
      <GlobalStyle />
      <Container className="App">
        <Header {...toggle} className="App-header">
          EmotiVoice
        </Header>
        <Textarea {...sentenceProps} />
        <SliderContainer>
          <Icon style={{ color: 'black' }} type="frown-o" />
          <Slider style={{ width: '100%' }} {...xProps} />
          <Icon style={{ color: 'black' }} type="smile-o" />
        </SliderContainer>
        <SliderContainer>
          <Icon style={{ color: 'black' }} type="man" />
          <Slider style={{ width: '100%' }} {...yProps} />
          <Icon style={{ color: 'black' }} type="woman" />
        </SliderContainer>
        <PresetContainer>
          <PresetButton onClick={() => handleOnClickPreset({ x: 10, y: 20 })}>
            Min-su
          </PresetButton>
          <PresetButton onClick={() => handleOnClickPreset({ x: -10, y: 20 })}>
            Joel
          </PresetButton>
          <PresetButton onClick={() => handleOnClickPreset({ x: 10, y: -20 })}>
            Sung-en
          </PresetButton>
          <PresetButton onClick={() => handleOnClickPreset({ x: -10, y: -20 })}>
            Geon
          </PresetButton>
        </PresetContainer>
        <SubmitButton onClick={() => handleOnSubmit()}>Submit</SubmitButton>
      </Container>
    </>
  );
}

export default App;
