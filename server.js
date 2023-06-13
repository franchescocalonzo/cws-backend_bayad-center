const express = require("express");
const errorHandler = require("./middleware/errorHandler");

const dotenv = require("dotenv").config();

const app = express();
const cors = require("cors");
const port = process.env.PORT || 8001;

app.use(cors({ origin: "*" }));

// parses incoming requests with JSON because the data received by the server is object
app.use(express.json());

app.use("/api/", require("./routes/cwsRoutes"));

app.all("*", (req, res, next) => {
  res.status(404).send({
    message: `Request cannot be found.`,
  });
});

// express will automatically call this method when there is an error occur
// app.use((error, req, res, next) => {
//   error.statusCode = error.statusCode || 500;
//   error.status = error.status || "error";
//   res.status(error.statusCode).json({ status: error, message: error.message });
// });

// app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`);
});
