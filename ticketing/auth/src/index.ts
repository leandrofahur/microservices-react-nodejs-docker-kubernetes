import express from "express";
import "express-async-errors";

import { errorHandler } from "./middlewares/error-handler";
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { NotFoundError } from "./errors/not-found-error";
import { connectDB } from "./databases";

const app = express();
app.use(express.json());

connectDB();

// routes
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.all("*", async (req, res) => {
  throw new NotFoundError();
});

// middlewares
app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server up and running on port 3000!");
});
