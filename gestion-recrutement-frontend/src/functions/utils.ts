import axios, { AxiosError } from "axios";

export async function handlePostRequest(
  path: string,
  data: any,
  onError: (err: AxiosError<any, any>) => void,
  token?: string
) {
  try {
    if (!token)
      return await axios.post(`${process.env.BACKEND_URL}${path}`, data);
    return await axios.post(`${process.env.BACKEND_URL}${path}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      onError(error);
      return null;
    }
  }
}

export async function handleGetRequest(
  path: string,
  data: any,
  onError: (err: AxiosError<any, any>) => void,
  token?: string
) {
  try {
    if (!token)
      return await axios.get(`${process.env.BACKEND_URL}${path}`, {
        data: data,
      });
    return await axios.get(`${process.env.BACKEND_URL}${path}`, {
      data: data,
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      onError(error);
      return null;
    }
  }
}
