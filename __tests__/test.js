import fs from 'fs';
import url from 'url';
import axios from 'axios';
import { parseRequest } from 'http-string-parser';

test('should work', async () => {
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
    headers: requestObj.headers,
    method: requestObj.method,
    url: requestUrl,
  };

  const { status, statusText } = await axios(options);
  const result = { status, statusText };
  expect(result).toMatchObject({ status: 200 });
});
