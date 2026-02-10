import { describe, expect, it } from "vitest";
import { Context } from "./context";

describe("Context", () => {
  describe("text()", () => {
    it("should return text response with default status 200", async () => {
      const req = new Request("http://localhost/");
      const ctx = new Context(req);

      const response = ctx.text("Hello World");

      expect(response.status).toBe(200);
      expect(response.headers.get("Content-Type")).toBe("text/plain");
      expect(await response.text()).toBe("Hello World");
    });

    it("should return text response with custom status", async () => {
      const req = new Request("http://localhost/");
      const ctx = new Context(req);

      const response = ctx.text("Created", 201);

      expect(response.status).toBe(201);
      expect(await response.text()).toBe("Created");
    });
  });

  describe("json()", () => {
    it("should return JSON response with default status 200", async () => {
      const req = new Request("http://localhost/");
      const ctx = new Context(req);
      const data = { message: "Hello JSON" };

      const response = ctx.json(data);

      expect(response.status).toBe(200);
      expect(response.headers.get("Content-Type")).toBe("application/json");
      expect(await response.json()).toEqual(data);
    });

    it("should return JSON response with custom status", async () => {
      const req = new Request("http://localhost/");
      const ctx = new Context(req);
      const data = { error: "Not Found" };

      const response = ctx.json(data, 404);

      expect(response.status).toBe(404);
      expect(await response.json()).toEqual(data);
    });

    it("should handle array data", async () => {
      const req = new Request("http://localhost/");
      const ctx = new Context(req);
      const data = [1, 2, 3];

      const response = ctx.json(data);

      expect(await response.json()).toEqual(data);
    });
  });

  describe("html()", () => {
    it("should return HTML response with default status 200", async () => {
      const req = new Request("http://localhost/");
      const ctx = new Context(req);
      const html = "<h1>Hello HTML</h1>";

      const response = ctx.html(html);

      expect(response.status).toBe(200);
      expect(response.headers.get("Content-Type")).toBe("text/html");
      expect(await response.text()).toBe(html);
    });

    it("should return HTML response with custom status", async () => {
      const req = new Request("http://localhost/");
      const ctx = new Context(req);
      const html = "<h1>Server Error</h1>";

      const response = ctx.html(html, 500);

      expect(response.status).toBe(500);
      expect(await response.text()).toBe(html);
    });
  });

  describe("constructor", () => {
    it("should store the request object", () => {
      const req = new Request("http://localhost/test");
      const ctx = new Context(req);

      expect(ctx.req).toBe(req);
      expect(ctx.req.url).toBe("http://localhost/test");
    });
  });
});
