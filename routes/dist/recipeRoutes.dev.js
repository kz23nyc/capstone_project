"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _Recipe = _interopRequireDefault(require("../models/Recipe.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); // Creating a New recipe
// router.post("/", async (req, res) => {
//     const { name, description, cookingTime, ingredients, categories } = req.body;
//     try {
//         // Convert category names to ObjectIDs
//         const categoryIds = await Promise.all(categories.map(async (categoryName) => {
//             const category = await Category.findOne({ name: categoryName });
//             if (!category) {
//                 throw new Error(`Category '${categoryName}' not found`);
//             }
//             return category._id;
//         }));
//         // Create the new recipe with category ObjectIDs
//         const newRecipe = new Recipe({
//             name,
//             description,
//             cookingTime,
//             ingredients,
//             categories: categoryIds
//         });
//         await newRecipe.save();
//         res.status(201).json(newRecipe);
//     } catch (error) {
//         console.error(`Error creating new recipe: ${error.message}`);
//         res.status(400).json({ message: "Error creating new recipe", error: error.message });
//     }
// });


router.post("/", function _callee(req, res) {
  var newRecipe;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_Recipe["default"].create(req.body));

        case 3:
          newRecipe = _context.sent;
          res.status(201).json(newRecipe);
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          res.status(400).json({
            message: "Error creating new recipe",
            error: _context.t0
          });

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // Retrieving All recipes

router.get("/", function _callee2(req, res) {
  var recipes;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_Recipe["default"].find());

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
          return regeneratorRuntime.awrap(_Recipe["default"].findById(req.params.recipeId));

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
}); // Retrieving Comments for a recipe

router.get("/recipe/:recipeId/comments", function _callee4(req, res) {
  var comments;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Comment.find({
            recipe: req.params.recipeId
          }).populate('recipe'));

        case 3:
          comments = _context4.sent;
          res.json(comments);
          _context4.next = 10;
          break;

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          res.status(500).json({
            message: "Error fetching comments",
            error: _context4.t0
          });

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // Retrieving recipe by ingredients

router.get("/findByIngredients", function _callee5(req, res) {
  var ingredients, ingredientList, recipes;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          ingredients = req.query.ingredients; // Expect ingredients as a comma-separated list

          ingredientList = ingredients.split(',').map(function (ingredient) {
            return ingredient.trim().toLowerCase();
          });
          _context5.next = 5;
          return regeneratorRuntime.awrap(_Recipe["default"].find({
            ingredients: {
              $all: ingredientList
            }
          }));

        case 5:
          recipes = _context5.sent;
          res.json(recipes);
          _context5.next = 12;
          break;

        case 9:
          _context5.prev = 9;
          _context5.t0 = _context5["catch"](0);
          res.status(500).json({
            message: "Error finding recipes with given ingredients",
            error: _context5.t0
          });

        case 12:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 9]]);
}); // PUT request to update a recipe by ID

router.put('/:id', function _callee6(req, res) {
  var id, updatedData, updatedRecipe;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          id = req.params.id;
          updatedData = req.body;
          _context6.prev = 2;
          _context6.next = 5;
          return regeneratorRuntime.awrap(_Recipe["default"].findByIdAndUpdate(id, updatedData, {
            "new": true
          }));

        case 5:
          updatedRecipe = _context6.sent;
          res.status(200).json(updatedRecipe);
          _context6.next = 12;
          break;

        case 9:
          _context6.prev = 9;
          _context6.t0 = _context6["catch"](2);
          res.status(500).json({
            error: 'Failed to update recipe'
          });

        case 12:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[2, 9]]);
}); // Partially updating a recipe by ID

router.patch("/:id", function _callee7(req, res) {
  var id, updates, updatedRecipe;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          id = req.params.id;
          updates = req.body;
          _context7.prev = 2;
          _context7.next = 5;
          return regeneratorRuntime.awrap(_Recipe["default"].findByIdAndUpdate(id, updates, {
            "new": true,
            runValidators: true
          }));

        case 5:
          updatedRecipe = _context7.sent;

          if (updatedRecipe) {
            _context7.next = 8;
            break;
          }

          return _context7.abrupt("return", res.status(404).json({
            message: "Recipe not found"
          }));

        case 8:
          res.json(updatedRecipe);
          _context7.next = 14;
          break;

        case 11:
          _context7.prev = 11;
          _context7.t0 = _context7["catch"](2);
          res.status(400).json({
            message: "Error updating recipe",
            error: _context7.t0
          });

        case 14:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[2, 11]]);
}); // Delete a recipe by ID

router["delete"]("/:id", function _callee8(req, res) {
  var id;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          id = req.params.id;
          _context8.next = 4;
          return regeneratorRuntime.awrap(_Recipe["default"].findByIdAndDelete(id));

        case 4:
          res.status(200).json({
            message: "Recipe deleted successfully"
          });
          _context8.next = 10;
          break;

        case 7:
          _context8.prev = 7;
          _context8.t0 = _context8["catch"](0);
          res.status(500).json({
            message: "Error deleting recipe",
            error: _context8.t0
          });

        case 10:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
var _default = router;
exports["default"] = _default;