"use strict";

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _morgan = _interopRequireDefault(require("morgan"));

var _cors = _interopRequireDefault(require("cors"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _recipeRoutes = _interopRequireDefault(require("./routes/recipeRoutes.js"));

var _categoryRoutes = _interopRequireDefault(require("./routes/categoryRoutes.js"));

var _commentRoutes = _interopRequireDefault(require("./routes/commentRoutes.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var app = (0, _express["default"])();
app.use((0, _cors["default"])()); //Enable Cross-Origin Resource Sharing

app.use(_express["default"].json()); // parse incoming JSON request bodies

app.use((0, _morgan["default"])("dev")); // logger for development

var PORT = process.env.PORT || 4002; // =========== Connect to MongoDB===== //

_mongoose["default"].connect(process.env.MONGODB_URI).then(function () {
  return console.log("Connected to MongoDB");
})["catch"](function (error) {
  return console.error("Could not connect to MongoDB:", error);
});

app.get("/", function (req, res) {
  res.send("Welcome to my Pantrylicious API!");
}); // =========== Routes ===== //

app.use("/api/recipes", _recipeRoutes["default"]);
app.use("/api/categories", _categoryRoutes["default"]);
app.use("/api/comments", _commentRoutes["default"]); // Handling 404 Not Found

app.use(function (req, res) {
  res.status(404).send("Resource not found");
});
app.listen(PORT, function () {
  console.log("Server running on port: ".concat(PORT));
});