const server = 'https://staging.karnaphulijewellery.com/api';
export const wsServer = 'wss://staging.karnaphulijewellery.com/api';
export const wsAPIKey = 'test';

const FALLBACK_RESPONSE = Symbol.for('KARNAPHULIAPP_FALLBACK_RESPONSE');

export const isFallbackResponse = (data: any) => data === FALLBACK_RESPONSE;

export const get = async (path: string, params?: any, token?: string, doNotThrowOnAPIError?: boolean) => {
  const url = new URL(server + path);
  if (params) {
    Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));
  }
  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // Add bearer token if any
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  const { status, message, data } = await response.json();
  if (status) {
    return data;
  }

  if (doNotThrowOnAPIError) {
    return FALLBACK_RESPONSE;
  }

  throw new Error(message);
};

export const post = async (path: string, params?: any, token?: string) => {
  const url = new URL(server + path);

  let body;

  if (params) {
    if (params instanceof FormData) {
      body = params;
    } else {
      body = JSON.stringify(params);
    }
  }

  const response = await fetch(url.toString(), {
    method: 'POST',
    headers: {
      // Only add content type if body is present and not form data
      ...(body &&
        params instanceof FormData === false && {
          'Content-Type': 'application/json',
        }),
      // Add bearer token if any
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body,
  });
  const { status, message, data } = await response.json();
  if (status) {
    return data;
  }
  throw new Error(message);
};

export const getSWR = ({
  path,
  params,
  token,
  doNotThrowOnAPIError,
}: {
  path: string;
  params?: any;
  token?: string;
  doNotThrowOnAPIError?: boolean;
}) => get(path, params, token, doNotThrowOnAPIError);
