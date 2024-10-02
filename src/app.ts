import "dotenv/config";
import express from "express";
import route from "./routes/route";
const app = express();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// route
app.use("/", route);

// running
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`NodeJS Running on port ${port}`);
});
