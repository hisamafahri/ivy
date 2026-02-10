import Ivy from "./src/index";

const app = new Ivy();

app.get("/", (c) => c.text("Hello Bun!"));

app.get("/json", (c) => c.json({ message: "Hello JSON!" }));

app.post("/data", (c) => c.json({ received: "POST request" }));

export default app;
