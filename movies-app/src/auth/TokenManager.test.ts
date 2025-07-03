import apiRequest from '../api/common/apiRequest';
import HttpStatusCode from '../api/common/HTTPStatusCode';

jest.mock('../config/config', () => ({
  Config: { REACT_APP_SERVER_BASE_URL: 'http://localhost:4000' },
}));

const consoleErrorSpy = jest
  .spyOn(console, 'error')
  .mockImplementation(() => {});

const createMockResponse = ({
  ok = true,
  status = 200,
  jsonData = {},
  textData = '',
}: {
  ok?: boolean;
  status?: number;
  jsonData?: any;
  textData?: string;
}): Response =>
  ({
    ok,
    status,
    json: jest.fn().mockResolvedValue(jsonData),
    text: jest.fn().mockResolvedValue(textData),
  }) as unknown as Response;

declare const global: typeof globalThis & { fetch: jest.Mock };

describe('apiRequest utility', () => {
  const endpoint = '/test-endpoint';
  const headers = { Accept: 'application/json' } as const;

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });

  it('should perform a successful GET and return parsed JSON', async () => {
    const expected = { hello: 'world' };
    global.fetch = jest
      .fn()
      .mockResolvedValue(createMockResponse({ jsonData: expected }));

    const result = await apiRequest<typeof expected>(endpoint, 'GET', headers);

    expect(global.fetch).toHaveBeenCalledWith(
      `http://localhost:4000${endpoint}`,
      {
        method: 'GET',
        headers,
        body: undefined,
      },
    );
    expect(result).toEqual(expected);
  });

  it('should stringify plain‑object bodies for POST requests', async () => {
    const body = { title: 'Jest in Action' };
    const expected = { created: true };
    global.fetch = jest
      .fn()
      .mockResolvedValue(createMockResponse({ jsonData: expected }));

    const result = await apiRequest<typeof expected, typeof body>(
      endpoint,
      'POST',
      headers,
      body,
    );

    const [, opts] = global.fetch.mock.calls[0];
    expect(opts.body).toBe(JSON.stringify(body));
    expect(result).toEqual(expected);
  });

  it('should pass FormData bodies through untouched', async () => {
    const formData = new FormData();
    formData.append('file', new Blob(['dummy']), 'dummy.txt');

    global.fetch = jest
      .fn()
      .mockResolvedValue(createMockResponse({ jsonData: {} }));

    await apiRequest<any, FormData>(endpoint, 'POST', headers, formData);
    const [, opts] = global.fetch.mock.calls[0];
    expect(opts.body).toBe(formData);
  });

  it('should return an APIError with status & message when server responds with JSON error payload', async () => {
    const payload = { message: 'Not found' };
    global.fetch = jest.fn().mockResolvedValue(
      createMockResponse({
        ok: false,
        status: 404,
        textData: JSON.stringify(payload),
      }),
    );

    const result = await apiRequest<any>(endpoint, 'GET', headers);
    expect(result).toEqual({ status: 404, message: 'Not found' });
  });

  it('should return an APIError with status only when server responds with non‑JSON error payload', async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValue(
        createMockResponse({ ok: false, status: 500, textData: 'Server boom' }),
      );

    const result = await apiRequest<any>(endpoint, 'GET', headers);
    expect(result).toEqual({ status: 500 });
  });

  it('should return BAD_REQUEST when fetch rejects at network level', async () => {
    const networkErrorJson = JSON.stringify({
      status: HttpStatusCode.BAD_REQUEST,
    });
    global.fetch = jest.fn().mockRejectedValue(new Error(networkErrorJson));

    const result = await apiRequest<any>(endpoint, 'GET', headers);
    expect(result).toEqual({ status: HttpStatusCode.BAD_REQUEST });
  });
});
