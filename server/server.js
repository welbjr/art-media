const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRouter = require("./routes/authRoutes");
const artsRouter = require("./routes/artsRoutes");
const usersRouter = require("./routes/usersRoutes");
const commentsRouter = require("./routes/commentsRoutes");
const likesRouter = require("./routes/likesRoutes");
const museumRouter = require("./routes/museumRoutes");

const app = express();

// ------------Middlewares------------ //
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.URL,
    credentials: true,
  })
);

// ---------------Rotas--------------- //
app.use("/auth", authRouter);
app.use("/arts", artsRouter);
app.use("/comments", commentsRouter);
app.use(
  "/likes",
  (req, res, next) => {
    next();
  },
  likesRouter
);
app.use("/users", usersRouter);
app.use("/museum", museumRouter);

// Lança um erro para rotas inválidas
app.use((_, res, next) => {
  const err = new Error("Not found");
  err.status = 404;
  next(err);
});

// Trata os erros que ocorrem na aplicação,
// enviando uma mensagem (json) com o problema
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    status: "failed",
    data: {
      message: err.message,
      code: err.status,
    },
  });
});

// ----------------App---------------- //
const PORT = process.env.PORT || 5000;
app.listen({ port: PORT }, async () => {
  console.log(`Running on port ${PORT}`);
});
