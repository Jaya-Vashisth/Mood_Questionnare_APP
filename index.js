const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const userRouter = require("./routes/userRoutes");
const questionRouter = require("./routes/questionareRoutes");
// const responseRoutes = require("./routes/responseRoutes");

const app = express();

dotenv.config({ path: "./config.env" });
app.use(express.json());

const PORT = process.env.PORT || 3000;
const DATABASE = process.env.DATABASE;

mongoose.connect(DATABASE).then(() => {
  console.log("Connected to Database");
});

app.use("/api/v1/users", userRouter);
// app.use("/api/response", responseRoutes);
app.use("/api/v1/questionnare", questionRouter);

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
