"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var commentSchema = new _mongoose["default"].Schema({
  recipe: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'Recipe',
    required: true
  },
  user: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    "default": Date.now
  }
}, {
  timestamps: true
});

var Comment = _mongoose["default"].model('Comment', commentSchema);

var _default = Comment;
exports["default"] = _default;