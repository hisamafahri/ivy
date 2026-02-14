# Route Group Specification

To be able to easily manage and maintain growing number of routes, users can split routes into "groups" in a form of `Vixy` instances.

```ts
// users.ts
import Vixy from "vixy";

const controller = new Vixy();

controller.get("/users", () => {});

export default controller;
```

```ts
import Vixy from "vixy";
import userController from "./users";

const app = new Vixy();

app.get("/", () => {});
app.route("/v1", userController);

app.listen()
```

## Ordering

From hono

```ts
three.get("/hi", (c) => c.text("hi"))
two.route("/three", three)
app.route("/two", two)
```

```sh
# this will work as expected
GET /two/three/hi ---> `hi`
```
