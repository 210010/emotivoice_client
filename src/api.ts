import axios from 'axios';

const baseURL = process.env.REACT_APP_API_HOST;
const baseAPI = axios.create({ baseURL });

export const apis = {
  getToken: async () => {
    const { data } = await baseAPI.post(`token`);
    return data;
  },
  requestDemo: async (token: string) => {
    const { data } = await baseAPI.post<string[]>(`demo`, {
      headers: {
        'X-Auth-Token': token,
      },
    });
    return data[0];
  },
  requestTTS: async (text: string, style: string, token: string) => {
    const textList = text
      .split(/s*(?:\.|,|\?|!)s*/)
      .filter((value) => value.trim() !== '');
    const { data } = await baseAPI.post(
      `tts`,
      textList.map((value) => {
        return { text: value.trim(), style };
      }),
      {
        headers: {
          'X-Auth-Token': token,
        },
      },
    );
    return data;
  },
};
