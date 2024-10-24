"use strict";

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import cors from 'cors';
// import morgan from 'morgan';
var app = (0, _express["default"])();
var PORT = process.env.PORT || 4000;
app.get('/', function (req, res) {
  res.send('Welcome to my Pantrylicious recipe API!');
});
app.listen(PORT, function () {
  return console.log("Server running on port: ".concat(PORT));
}); // =========== Middleware ===== //
// Log all requests using morgan with the 'dev' format

app.use((0, _morgan["default"])('dev')); // logger