import React from 'react';
import styled from 'styled-components';
import WithoutImage from '../assets/without.png';
import WithImage from '../assets/with.png';

const Container = styled.div``;

const Section = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin: 5rem 0;
`;

const FancyImage = styled.img`
  height: 10rem;
  margin: 0 5rem;
`;

const Content = styled.div``;

const Title = styled.div`
  font-size: 2rem;
`;

const Subtitle = styled.div``;

const Text = styled.div`
  font-size: 1rem;
`;

function PassiveExample() {
  return (
    <Container>
      <Section>
        <FancyImage src={WithoutImage}></FancyImage>
        <Content>
          <Title>감정없이 텍스트만 읽는 기존의 TTS</Title>
          <Text>(대충 기존 TTS는 심심하다는 내용)</Text>
        </Content>
      </Section>
      <Section>
        <Content>
          <Title>감정을 추가한 EmotiVoice의 TTS</Title>
          <Text>(대충 우리의 TTS는 멋지다는 내용)</Text>
        </Content>
        <FancyImage src={WithImage}></FancyImage>
      </Section>
    </Container>
  );
}

export default PassiveExample;
