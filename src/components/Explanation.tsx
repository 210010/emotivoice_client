import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  font-size: 2rem;
  font-weight: 900;
`;

const Subtitle = styled.div`
  font-size: 1.5rem;
`;

const Content = styled.div`
  font-size: 1rem;
  max-width: 25rem;
`;

function Explanation() {
  return (
    <Container>
      <Title>
        목소리에 <span style={{ color: '#c79202' }}>색</span>을 불어넣다.
      </Title>
      <Subtitle>감정이 들어간 TTS</Subtitle>
      <Content>(대충 TTS에 감정이 들어갔다는 내용)</Content>
    </Container>
  );
}

export default Explanation;
