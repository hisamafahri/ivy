import Vixy from "../../src";

const app = new Vixy();

// JSON body parsing
app.post("/api/json", async (c) => {
  const body = await c.req.json();
  return c.res.json({ received: body, type: "json" });
});

// Text body parsing
app.post("/api/text", async (c) => {
  const body = await c.req.text();
  return c.res.text(`You sent: ${body}`);
});

// Form data parsing
app.post("/api/form", async (c) => {
  const formData = await c.req.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  return c.res.json({ name, email });
});

// Binary data parsing
app.post("/api/binary", async (c) => {
  const buffer = await c.req.arrayBuffer();
  return c.res.json({ byteLength: buffer.byteLength });
});

// Multiple body parser calls (demonstrating caching)
app.post("/api/multi", async (c) => {
  // You can call multiple body parsers on the same request
  // without getting "Body already used" error
  const json = await c.req.json();
  const text = await c.req.text();
  const buffer = await c.req.arrayBuffer();

  return c.res.json({
    parsedAsJson: json,
    textLength: text.length,
    bufferSize: buffer.byteLength,
  });
});
