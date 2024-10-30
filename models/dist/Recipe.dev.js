"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var recipeSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  cookingTime: {
    type: Number,
    required: true
  },
  instructions: {
    type: String,
    required: true
  },
  ingredients: [String],
  categories: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'Category'
  }]
}, {
  timestamps: true
});

var _default = _mongoose["default"].model("Recipe", recipeSchema);

exports["default"] = _default;