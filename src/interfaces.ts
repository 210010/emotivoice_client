export interface User {
  id: string;
  password: string;
  username: string;
}

export interface Emotion {
  x: number;
  y: number;
}

export interface Emotivoice {
  sentence: string;
  emotion: Emotion;
}
