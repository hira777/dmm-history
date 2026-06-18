import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, relative, resolve } from 'node:path';

const port = Number(process.env.PORT ?? 5173);
const fixtureRoot = resolve('dev/fixtures');

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml'
};

const server = createServer((request, response) => {
  const requestUrl = new URL(request.url ?? '/', `http://localhost:${port}`);
  const pathname =
    requestUrl.pathname === '/' ? '/fanza-list-page.html' : requestUrl.pathname;
  const filePath = resolve(fixtureRoot, `.${decodeURIComponent(pathname)}`);
  const relativePath = relative(fixtureRoot, filePath);

  if (
    relativePath.startsWith('..') ||
    relativePath === '' ||
    !existsSync(filePath)
  ) {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Not found');
    return;
  }

  if (!statSync(filePath).isFile()) {
    response.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Forbidden');
    return;
  }

  response.writeHead(200, {
    'Content-Type':
      contentTypes[extname(filePath)] ?? 'application/octet-stream'
  });
  createReadStream(filePath).pipe(response);
});

server.listen(port, () => {
  console.log(`Fixture server: http://localhost:${port}/fanza-list-page.html`);
});
