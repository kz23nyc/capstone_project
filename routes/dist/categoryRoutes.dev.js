"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _Recipe = _interopRequireDefault(require("../models/Recipe.js"));

var _Category = _interopRequireDefault(require("../models/Category.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post('/', function _callee(req, res) {
  var category;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_Category["default"].create(req.body));

        case 3:
          category = _context.sent;
          res.status(201).json(category);
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          res.status(400).json({
            message: "Error creating category",
            error: _context.t0
          });

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
router.get('/', function _callee2(req, res) {
  var categories;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_Category["default"].find());

        case 3:
          categories = _context2.sent;
          res.json(categories);
          _context2.next = 10;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            message: "Error retrieving categories",
            error: _context2.t0
          });

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
router.get('/:categoryName', function _callee3(req, res) {
  var categoryName, category, recipes;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          categoryName = req.params.categoryName;
          _context3.next = 4;
          return regeneratorRuntime.awrap(_Category["default"].findOne({
            name: categoryName
          }));

        case 4:
          category = _context3.sent;

          if (category) {
            _context3.next = 7;
            break;
          }

          return _context3.abrupt("return", res.status(404).json({
            message: "Category not found"
          }));

        case 7:
          _context3.next = 9;
          return regeneratorRuntime.awrap(_Recipe["default"].find({
            categories: category._id
          }).populate('categories'));

        case 9:
          recipes = _context3.sent;
          res.status(200).json(recipes);
          _context3.next = 16;
          break;

        case 13:
          _context3.prev = 13;
          _context3.t0 = _context3["catch"](0);
          res.status(500).json({
            message: 'Error retrieving recipes by category',
            error: _context3.t0
          });

        case 16:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 13]]);
}); // PUT route to update categories in a recipe

router.put('/api/recipes/:id', function _callee4(req, res) {
  var categories, categoryIds, categoryObjectIds, updatedRecipe;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          categories = req.body.categories; // Find ObjectIds for the provided category names

          _context4.next = 4;
          return regeneratorRuntime.awrap(_Category["default"].find({
            name: {
              $in: categories
            }
          }).select('_id'));

        case 4:
          categoryIds = _context4.sent;
          console.log("Found Category IDs:", categoryIds);
          categoryObjectIds = categoryIds.map(function (category) {
            return category._id;
          });
          console.log("Mapped Category ObjectIds:", categoryObjectIds);
          _context4.next = 10;
          return regeneratorRuntime.awrap(_Recipe["default"].findByIdAndUpdate(req.params.id, {
            categories: categoryObjectIds
          }, {
            "new": true
          }));

        case 10:
          updatedRecipe = _context4.sent;

          if (updatedRecipe) {
            _context4.next = 13;
            break;
          }

          return _context4.abrupt("return", res.status(404).json({
            error: 'Recipe not found'
          }));

        case 13:
          res.status(200).json(updatedRecipe);
          _context4.next = 20;
          break;

        case 16:
          _context4.prev = 16;
          _context4.t0 = _context4["catch"](0);
          console.error("Error in updating recipe:", _context4.t0);
          res.status(500).json({
            error: 'Failed to update recipe'
          });

        case 20:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 16]]);
});
router["delete"]("/:id", function _callee5(req, res) {
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(_Category["default"].findByIdAndDelete(id));

        case 3:
          res.status(200).json({
            message: "Category deleted successfully"
          });
          _context5.next = 9;
          break;

        case 6:
          _context5.prev = 6;
          _context5.t0 = _context5["catch"](0);
          res.status(500).json({
            message: "Error deleting category",
            error: _context5.t0
          });

        case 9:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 6]]);
});
var _default = router;
exports["default"] = _default;