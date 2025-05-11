const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connect = require("./db/connect.js");
const cookieParser = require("cookie-parser");

PORT = process.env.PORT || 5000;

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", require("./routes/authRoutes.js"));

app.listen(PORT, () => {
  connect();
  console.log(`Server is running on port ${PORT}`);
});
