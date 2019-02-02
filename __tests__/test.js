import fs from 'fs';
import url from 'url';
import axios from 'axios'; // eslint-disable-line
import { parseRequest } from 'http-string-parser'; // eslint-disable-line

describe('request', () => {
  const data = fs.readFileSync('solution', 'utf-8');
  const requestObj = parseRequest(data);

  const parts = {
    port: 8080,
    protocol: 'http',
    hostname: 'localhost',
    pathname: requestObj.uri,
  };
  const requestUrl = url.format(parts);

  const options = {
    method: requestObj.method,
    headers: requestObj.headers,
    data: requestObj.body,
    url: requestUrl,
  };

  it('should work', async () => {
    const { status, statusText } = await axios(options);
    const result = { status, statusText };
    expect(result).toMatchObject({ status: 200 });
  });
});
