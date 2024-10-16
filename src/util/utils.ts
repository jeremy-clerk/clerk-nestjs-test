import { IncomingMessage } from 'node:http';

export const reqTransformer = async (req: IncomingMessage & { body: any }) => {
  const headers = Object.keys(req.headers).reduce(
    (acc, key) => Object.assign(acc, { [key]: req?.headers[key] }),
    {},
  );

  const body =
    req.method !== 'GET' && req.method !== 'HEAD'
      ? req.body && typeof req.body === 'object'
        ? req.body
        : await createRequestBody(req)
      : null;
  return new Request(req.url, {
    method: req.method,
    body: body,
    headers: new Headers(headers),
  });
};

function createRequestBody(req: IncomingMessage): Promise<Buffer> {
  return new Promise<Buffer>((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', (chunk: Buffer) => {
      chunks.push(chunk);
    });
    req.on('end', () => {
      resolve(Buffer.concat(chunks));
    });
    req.on('error', (err) => {
      reject(err);
    });
  });
}
