import axios from 'axios';
import { APIManager } from './interfaces';

export const getAPIManager = (apiHost?: string) =>
  apiHost ? new RealAPIManager(apiHost) : new FakeAPIManager();

class FakeAPIManager implements APIManager {
  async setupToken(): Promise<void> {
    /* no-op */
  }

  async requestTTS(text: string, style: string): Promise<string> {
    return '';
  }

  getAudioURL(filename: string): string {
    return '';
  }
}

class RealAPIManager implements APIManager {
  token: string;
  apiHost: string;

  constructor(apiHost: string) {
    this.token = '';
    this.apiHost = apiHost;
  }

  async setupToken(): Promise<void> {
    this.token = (await axios.post<string>(`${this.apiHost}/token`)).data;
  }

  async requestTTS(text: string, style: string): Promise<string> {
    return (
      await axios.post<string>(`${this.apiHost}/tts`, [{ text, style }], {
        headers: {
          'X-Auth-Token': this.token,
        },
      })
    ).data[0];
  }

  getAudioURL(filename: string): string {
    return `${this.apiHost}/audio?filename=${filename}`;
  }
}
