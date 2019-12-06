export interface User {
  id: string;
  password: string;
  username: string;
}

export enum Emotion {
  NEUTRAL = 'neutral_000',
  HAPPY = 'happy_000',
  ANGRY = 'angry_000',
  SAD = 'sad_000',
}

export interface Emotivoice {
  sentence: string;
  emotion: Emotion;
}

export interface APIManager {
  setupToken(): Promise<void>;
  requestTTS(text: string, style: string): Promise<string>;
  getAudioURL(filename: string): string;
}
