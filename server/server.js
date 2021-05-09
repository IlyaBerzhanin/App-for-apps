const express = require("express");
const PORT = 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.writeHead(200, {
    Connection: "keep-alive",
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
  });
  next();
});

app.get("/", (req, res) => {
  console.log(Date.now());

  res.write("id: 1\n");
  res.write("data: some text\n\n");

  res.end();
});

app.listen(PORT, () => {
  console.log("This server has been started...");
});
