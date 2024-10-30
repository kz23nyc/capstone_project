"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _Recipe = _interopRequireDefault(require("../models/Recipe.js"));

var _helpers = require("../utils/helpers.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var router = _express["default"].Router(); //Creating a New recipe


router.post("/", function _callee(req, res) {
  var categoryIds, newRecipeData, recipe;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap((0, _helpers.getCategoryIdsFromNames)(req.body.categories));

        case 3:
          categoryIds = _context.sent;
          newRecipeData = _objectSpread({}, req.body, {
            categories: categoryIds // Replace names with their corresponding ObjectIds

          });
          recipe = new _Recipe["default"](newRecipeData);
          _context.next = 8;
          return regeneratorRuntime.awrap(recipe.save());

        case 8:
          res.status(201).json(recipe);
          _context.next = 15;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          console.error("Error creating new recipe: ".concat(_context.t0));
          res.status(400).json({
            message: "Error creating new recipe",
            error: _context.t0.toString()
          });

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 11]]);
}); // Retrieving All recipes

router.get("/", function _callee2(req, res) {
  var recipes;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_Recipe["default"].find().populate("categories"));

        case 3:
          recipes = _context2.sent;
          res.json(recipes);
          _context2.next = 10;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            message: "Error getting recipes",
            error: _context2.t0
          });

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // Retrieving A single recipe by ID

router.get("/:recipeId", function _callee3(req, res) {
  var recipe;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_Recipe["default"].findById(req.params.recipeId).populate("categories"));

        case 3:
          recipe = _context3.sent;

          if (recipe) {
            _context3.next = 6;
            break;
          }

          return _context3.abrupt("return", res.status(404).json({
            message: "Recipe not found"
          }));

        case 6:
          res.json(recipe);
          _context3.next = 12;
          break;

        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](0);
          res.status(500).json({
            message: "Error fetching recipe",
            error: _context3.t0
          });

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 9]]);
}); // PUT request to update a recipe by ID

router.put("/:id", function _callee4(req, res) {
  var updatedRecipe;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(_Recipe["default"].findByIdAndUpdate(req.params.id, req.body, {
            "new": true
          }));

        case 3:
          updatedRecipe = _context4.sent;
          res.status(200).json(updatedRecipe);
          _context4.next = 10;
          break;

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          res.status(500).json(_defineProperty({
            error: "Failed to update recipe"
          }, "error", _context4.t0));

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // Delete a recipe by ID

router["delete"]("/:id", function _callee5(req, res) {
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(_Recipe["default"].findByIdAndDelete(req.params.id));

        case 3:
          res.status(200).json({
            message: "Recipe deleted successfully"
          });
          _context5.next = 9;
          break;

        case 6:
          _context5.prev = 6;
          _context5.t0 = _context5["catch"](0);
          res.status(500).json({
            message: "Error deleting recipe",
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