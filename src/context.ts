export class Context {
  req: Request;

  constructor(req: Request) {
    this.req = req;
  }

  text(content: string, status = 200): Response {
    return new Response(content, {
      status,
      headers: { "Content-Type": "text/plain" },
    });
  }

  json(data: any, status = 200): Response {
    return new Response(JSON.stringify(data), {
      status,
      headers: { "Content-Type": "application/json" },
    });
  }

  html(content: string, status = 200): Response {
    return new Response(content, {
      status,
      headers: { "Content-Type": "text/html" },
    });
  }
}
