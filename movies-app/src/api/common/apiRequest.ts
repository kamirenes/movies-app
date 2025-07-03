import { Config } from '../../config/config';
import APIError from '../types/APIError';
import HttpStatusCode from './HTTPStatusCode';

export default async function apiRequest<
  ResponseType,
  RequestBody = undefined | unknown,
>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  headers: HeadersInit,
  body?: RequestBody,
): Promise<ResponseType | APIError> {
  try {
    const response = await fetch(
      `${Config.REACT_APP_SERVER_BASE_URL}${endpoint}`,
      {
        method,
        headers: headers,
        body: body
          ? body instanceof FormData
            ? body
            : JSON.stringify(body)
          : undefined,
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      let error: APIError = { status: response.status };
      try {
        const errorJson = JSON.parse(errorText);
        if (errorJson && errorJson.message) {
          error.message = errorJson.message;
        }
      } catch (error) {}
      throw new Error(JSON.stringify(error));
    }

    return (await response.json()) as ResponseType;
  } catch (error) {
    console.error('API error', error);
    let data: APIError = { status: HttpStatusCode.BAD_REQUEST };
    if (error instanceof Error) {
      const dataJSON = JSON.parse(error.message) as APIError;
      data = dataJSON;
    }
    return data;
  }
}
