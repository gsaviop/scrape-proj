const express = require("express");
const route = require("./routes");

const app = express();

app.use(express.json());
app.use(route);

app.listen(8000, () => {
    console.log('Server started on PORT 8000');
  });
