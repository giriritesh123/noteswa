const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 5000;
connectToMongo();

//middleware for using req.body
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Available routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`listening on port${port}`);
});
