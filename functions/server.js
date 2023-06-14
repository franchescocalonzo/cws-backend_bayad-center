const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 8001;

// to access the api publicly
app.use(cors({ origin: "*" }));

// parses incoming requests with JSON because the data received by the server is object
app.use(express.json());

app.use("/api/", require("./routes/cwsRoutes"));

// handler when trying to access the other urls
app.all("*", (req, res, next) => {
  res.status(404).send({
    message: `Request cannot be found.`,
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`);
});
