const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 4000;

app.use(express.json());

require("./DataBase/Db").connect();

const user = require("./Route/user");
app.use("/api/v1", user);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
