const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./database/connection").default;
const app = express();
const port = process.env.PORT || 5000;


app.use(cors());




app.listen(port, () => {
     
    console.log(`Server is running on http://localhost:${port}`);
}

);