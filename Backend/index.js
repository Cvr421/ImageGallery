const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./database/connection").default;
const userRouter = require("./routes/userRoutes");

const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());
app.use("/api/user", userRouter);


app.listen(port, () => {
     
    console.log(`Server is running on http://localhost:${port}`);
}

);