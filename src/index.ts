import { Context } from "./context";

type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

type Handler = (c: Context) => Response | Promise<Response>;

interface Route {
  method: Method;
  path: string;
  handler: Handler;
}

export default class Ivy {
  private routes: Route[] = [];

  on(
    methods: Method | Method[],
    paths: string | string[],
    handler: Handler,
  ): this {
    const methodArray = Array.isArray(methods) ? methods : [methods];
    const pathArray = Array.isArray(paths) ? paths : [paths];

    for (const method of methodArray) {
      for (const path of pathArray) {
        this.routes.push({ method, path, handler });
      }
    }

    return this;
  }

  get(path: string, handler: Handler): this {
    this.routes.push({ method: "GET", path, handler });
    return this;
  }

  post(path: string, handler: Handler): this {
    this.routes.push({ method: "POST", path, handler });
    return this;
  }

  put(path: string, handler: Handler): this {
    this.routes.push({ method: "PUT", path, handler });
    return this;
  }

  delete(path: string, handler: Handler): this {
    this.routes.push({ method: "DELETE", path, handler });
    return this;
  }

  patch(path: string, handler: Handler): this {
    this.routes.push({ method: "PATCH", path, handler });
    return this;
  }

  async fetch(req: Request): Promise<Response> {
    const url = new URL(req.url);
    const pathname = url.pathname;
    const method = req.method;

    for (const route of this.routes) {
      if (route.method === method && route.path === pathname) {
        const context = new Context(req);
        return await route.handler(context);
      }
    }

    return new Response("Not Found", { status: 404 });
  }
}
