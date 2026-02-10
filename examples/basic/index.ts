import Ivy from "../../src/index";

const app = new Ivy();

// Simple GET route
app.get("/", (c) => {
  return c.text("Hello World!");
});

// JSON response
app.get("/users", (c) => {
  return c.json({
    users: [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
    ],
  });
});

// Route with parameters
app.get("/users/:id", (c) => {
  const id = c.req.param("id");
  return c.json({ userId: id, name: `User ${id}` });
});

// Multiple route parameters
app.get("/posts/:postId/comments/:commentId", (c) => {
  const postId = c.req.param("postId");
  const commentId = c.req.param("commentId");
  return c.json({
    post: postId,
    comment: commentId,
  });
});

// POST route
app.post("/users", async (c) => {
  const body = await c.req.raw.json();
  return c.json(
    {
      message: "User created",
      user: body,
    },
    201,
  );
});

// HTML response
app.get("/about", (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>About</title>
      </head>
      <body>
        <h1>About Page</h1>
        <p>This is a sample Ivy application.</p>
      </body>
    </html>
  `);
});

// Multiple methods on same path
app.on(["GET", "POST"], "/multi", (c) => {
  return c.text(`Method: ${c.req.raw.method}`);
});

// Query parameters - single value
app.get("/search", (c) => {
  const query = c.req.query("q");
  const limit = c.req.query("limit") || "10";
  return c.json({
    query,
    limit,
    results: [],
  });
});

// Query parameters - get all at once
app.get("/filter", (c) => {
  const { category, minPrice, maxPrice } = c.req.query();
  return c.json({
    category,
    minPrice,
    maxPrice,
    items: [],
  });
});

// Multiple query values
app.get("/tags", (c) => {
  const tags = c.req.queries("tag");
  return c.json({
    tags: tags || [],
    count: tags?.length || 0,
  });
});

// Combining path params and query params
app.get("/users/:id/posts", (c) => {
  const userId = c.req.param("id");
  const page = c.req.query("page") || "1";
  const limit = c.req.query("limit") || "10";

  return c.json({
    userId,
    page: parseInt(page),
    limit: parseInt(limit),
    posts: [],
  });
});

// 404 for unmatched routes is handled automatically
export default app;
