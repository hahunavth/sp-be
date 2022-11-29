require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");

var router = express.Router();
const connectDb = require("./db.js");

var importHistory = require("./routes/importHistory");
var exportRouter = require("./routes/export");
var supplier = require("./routes/supplier");
var app = express();
connectDb;

app.use(
  cors({
    origin: "*",
  })
);

let port = process.env.PORT || 8080;

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// NOTE: add new routes here!
app.use("/api/v1/importProduct", importHistory);
app.use("/exportProduct", exportRouter);
app.use("/api/v1/supplier", supplier);

app.get("/", (req, res) => {
  res.render("index", {
    title: "SP_17 - M03",
    messages: [
      {
        msg: "Hello there!",
      },
      {
        msg: "Base url: ",
        link: "http://localhost:" + port + "/api/v1",
      },
      {
        msg: "Nhap hang: ",
        link: "http://localhost:" + port + "/api/v1/importProduct",
      },
      {
        msg: "Xuat hang: ",
        link: "http://localhost:" + port + "/api/v1/exportProduct",
      },
      {
        msg: "Nha cung cap: ",
        link: "http://localhost:" + port + "/api/v1/supplier",
      },
      {
        msg: "Swagger: ",
        link: "http://localhost:" + port + "/docs",
      },
    ],
  });
});

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

app.listen(port, function () {
  const host = "localhost";

  console.log("Example app listening at http://%s:%s", host, port);
});

module.exports = app;
