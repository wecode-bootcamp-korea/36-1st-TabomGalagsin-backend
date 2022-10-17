const app = require("./app");

app.set("port", process.env.PORT);

app.listen(app.get("port"), () => {
  console.log(`server listening on port ${app.get("port")}`);
});
