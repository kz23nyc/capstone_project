"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var categorySchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
}); // Index for category name to improve performance on queries involving the name

categorySchema.index({
  name: 1
});

var _default = _mongoose["default"].model("Category", categorySchema);

exports["default"] = _default;