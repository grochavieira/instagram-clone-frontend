import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import credentials from "./credentials";
import routes from "./routes";

mongoose
  .connect(credentials.MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Connected to database.");
    app.emit("ready...");
  })
  .catch((e) => console.log(e));

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(3333, () => {
  console.log("Listening to port 3333");
});
