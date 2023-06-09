import axios, { AxiosResponse } from 'axios';
import { API_URL } from './../constants';

export async function getSearchResults<T>(query: string): Promise<T[]> {
  try {
    const response: AxiosResponse<T[]> = await axios.get(`${API_URL}?q=${encodeURIComponent(query)}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
