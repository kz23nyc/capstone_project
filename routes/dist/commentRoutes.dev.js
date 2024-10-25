"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _Comment = _interopRequireDefault(require("../models/Comment.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); //post comment to a Specific recipe


router.post("/recipe/:recipeId", function _callee(req, res) {
  var _req$body, text, author, recipeId, newComment, savedComment;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, text = _req$body.text, author = _req$body.author;
          recipeId = req.params.recipeId; // Check if the recipeId is a valid ObjectId

          if (_mongoose["default"].Types.ObjectId.isValid(recipeId)) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: "Invalid recipe ID"
          }));

        case 4:
          newComment = new _Comment["default"]({
            text: text,
            author: author,
            recipe: recipeId
          });
          _context.prev = 5;
          _context.next = 8;
          return regeneratorRuntime.awrap(newComment.save());

        case 8:
          savedComment = _context.sent;
          res.status(201).json(savedComment);
          _context.next = 15;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](5);
          res.status(400).json({
            message: "Error posting comment",
            error: _context.t0
          });

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[5, 12]]);
}); // Get all comments for a specific recipe: recipeId

router.get("/recipe/:recipeId", function _callee2(req, res) {
  var recipeId, comments;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          recipeId = req.params.recipeId;
          _context2.next = 4;
          return regeneratorRuntime.awrap(_Comment["default"].find({
            recipe: recipeId
          }).populate("recipe"));

        case 4:
          comments = _context2.sent;
          res.json(comments);
          _context2.next = 11;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            message: "Error fetching comments",
            error: _context2.t0
          });

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 8]]);
}); // Get all comments

router.get("/", function _callee3(req, res) {
  var comments;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_Comment["default"].find({}).populate("recipe"));

        case 3:
          comments = _context3.sent;
          res.json(comments);
          _context3.next = 10;
          break;

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          res.status(500).json({
            message: "Error fetching comments",
            error: _context3.t0
          });

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
var _default = router;
exports["default"] = _default;