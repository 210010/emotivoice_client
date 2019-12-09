import React, { useState, useEffect } from 'react';
import { GlobalStyle } from './global-styles';
import styled from 'styled-components';
import { Emotion, Audio } from './interfaces';
import { apis } from './api';
import ReactHowler from 'react-howler';
import LoadingImage from './assets/loading.gif';
import { Table } from 'antd';

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
  font-size: 4rem;
  font-weight: 900;
  text-transform: uppercase;
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

const Textarea = styled.input`
  font-size: 1.2rem;
  border: none;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.5);
  min-width: 15rem;
  text-align: center;
  margin: 0.5rem 0;
  padding-bottom: 0.5rem;
  background-color: transparent;
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
  /* border: 0.5px solid rgba(0, 0, 0, 0.5); */
  /* border-radius: 0.2rem; */
  /* padding: 0.25rem 1rem 0.2rem 1rem; */
  margin: 0 0.2rem;
  color: black;
  font-size: 3rem;
  border-radius: 100%;
  transition: 0.5s ease-in-out;
  -webkit-filter: ${({ toggleState }) =>
    toggleState ? 'undefined' : 'grayscale(100%)'};
   filter: ${({ toggleState }) =>
     toggleState ? 'undefined' : 'grayscale(100%)'};
  /* background-color: ${({ toggleState }) =>
    toggleState ? '#d1edff' : 'white'}; */
`;

const SubmitButton = styled.button`
  border: 0.5px solid rgba(0, 0, 0, 0.5);
  border-radius: 0.2rem;
  padding: 0.25rem 1rem 0.2rem 1rem;
  color: black;
  min-height: 3rem;
  min-width: 7rem;
  font-size: 1rem;
  transition: 0.5s ease-in-out;
`;

const AudioListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
`;

const AudioContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
`;

const Loading = styled.img`
  width: 2rem;
  height: 2rem;
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

const emotionToEmoji = {
  [Emotion.NEUTRAL]: '🙂',
  [Emotion.HAPPY]: '😀',
  [Emotion.SAD]: '😭',
  [Emotion.ANGRY]: '😡',
};

function App() {
  const [isLoading, setLoading] = useState(false);
  const [token, setToken] = useState('');
  const toggle = useToggle(false);
  const sentenceProps = useInput('', 'enter the sentence');
  const selection = useSelect(Emotion.NEUTRAL);
  const [audioList, setAudioList] = useState<Audio[]>([]);

  const columns = [
    {
      title: 'Sentence',
      dataIndex: 'sentence',
      key: 'sentence',
      align: 'center' as any,
    },
    {
      title: 'Emotion',
      dataIndex: 'emotion',
      key: 'emotion',
      align: 'center' as any,
      render: (emotion) => (
        <span role="img" style={{ fontSize: '2rem' }}>
          {emotionToEmoji[emotion]}
        </span>
      ),
    },
    {
      title: 'Audio',
      dataIndex: 'audioURL',
      key: 'audioURL',
      align: 'center' as any,
      render: (audioURL) => (
        <audio
          controls
          autoPlay
          src={audioURL}
          style={{ marginTop: '10px' }}
        ></audio>
      ),
    },
  ];

  const handleOnSubmit = async () => {
    setLoading(true);
    const filename = await apis.requestTTS(
      sentenceProps.value,
      selection.emotion,
      token,
    );
    setAudioList([
      {
        sentence: sentenceProps.value,
        emotion: selection.emotion,
        audioURL: getAudioURL(filename),
      },
      ...audioList,
    ]);
    setLoading(false);
  };

  const fetchToken = async () => {
    const newToken = await apis.getToken();
    setToken(newToken);
    console.log(apis.requestDemo(token));
  };

  useEffect(() => {
    fetchToken();
  }, [setToken]);

  const getAudioURL = (filename: string): string => {
    return `${process.env.REACT_APP_API_HOST}/audio?filename=${filename}`;
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
            🙂
          </PresetButton>
          <PresetButton
            toggleState={selection.emotion === Emotion.HAPPY}
            onClick={() => selection.setEmotion(Emotion.HAPPY)}
          >
            😀
          </PresetButton>
          <PresetButton
            toggleState={selection.emotion === Emotion.SAD}
            onClick={() => selection.setEmotion(Emotion.SAD)}
          >
            😭
          </PresetButton>
          <PresetButton
            toggleState={selection.emotion === Emotion.ANGRY}
            onClick={() => selection.setEmotion(Emotion.ANGRY)}
          >
            😡
          </PresetButton>
        </PresetContainer>
        <SubmitButton onClick={() => handleOnSubmit()}>
          {!isLoading ? 'Submit' : <Loading src={LoadingImage} />}
        </SubmitButton>
        <AudioListContainer>
          <Table
            size="small"
            rowKey={'audioURL'}
            columns={columns}
            dataSource={audioList}
          />
        </AudioListContainer>
      </Container>
    </>
  );
}

export default App;
