var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./src/routes/index");
var usersRouter = require("./src/routes/users");
var auther = require("./src/routes/auth");
var dotenv = require("dotenv");
var app = express();
var { connectDB } = require("./src/config/configDB");
var cors = require("cors");
var movieRouter = require("./src/routes/movies");
const bookingRouter = require("./src/routes/booking");
const setupSwagger = require("./src/config/swagger");
const screeningRoutes = require("./src/routes/screenings");
const hallRoutes = require("./src/routes/hall");
const seatRoutes = require("./src/routes/seat");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors({ origin: "*" }));

dotenv.config();
connectDB();
setupSwagger(app);
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auther", auther);
app.use("/mv", movieRouter);
app.use("/booking", bookingRouter);
app.use("/", screeningRoutes);
app.use("/", seatRoutes);
app.use("/", hallRoutes);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
