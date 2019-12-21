export interface User {
  id: string;
  password: string;
  username: string;
}

export enum Emotion {
  NEUTRAL = 'neutral_001',
  HAPPY = 'happy_004',
  SAD = 'sad_038',
  /*
  84
  88
  97
  */
  ANGRY = 'angry_057',
  /*
  내일은 시험기간입니다, 나는 매우 화났습니다.
  */
}

export interface Audio {
  sentence: string;
  emotion: Emotion;
  audioURL: string;
}
