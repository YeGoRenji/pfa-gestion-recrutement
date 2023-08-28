import axios, { AxiosError } from "axios";

export async function handlePostRequest(
  path: string,
  data: any,
  onError: (err: AxiosError<any, any>) => void
) {
  try {
    return await axios.post(`${process.env.BACKEND_URL}${path}`, data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      onError(error);
      return (null);
    }
  }
}

export async function handleGetRequest(
  path: string,
  data: any,
  onError: (err: AxiosError<any, any>) => void
) {
  try {
    return await axios.get(`${process.env.BACKEND_URL}${path}`, data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      onError(error);
      return (null);
    }
  }
}
