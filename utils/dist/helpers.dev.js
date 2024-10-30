"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCategoryIdsFromNames = void 0;

var _Category = _interopRequireDefault(require("../models/Category.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 *  *To convert an array of category names (e.g ["Vegan", "Dinner"])
 * Convert an array of category names to an array of ObjectIds.
 * Throws an error if any category is not found.
 * @param {Array} categoryNames - Array of category names
 * @returns {Promise<Array>} Array of ObjectIds
 */
var getCategoryIdsFromNames = function getCategoryIdsFromNames(categoryNames) {
  var categoryIds;
  return regeneratorRuntime.async(function getCategoryIdsFromNames$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(Promise.all(categoryNames.map(function _callee(name) {
            var category;
            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return regeneratorRuntime.awrap(_Category["default"].findOne({
                      name: name
                    }));

                  case 2:
                    category = _context.sent;

                    if (category) {
                      _context.next = 5;
                      break;
                    }

                    throw new Error("Category not found: ".concat(name));

                  case 5:
                    return _context.abrupt("return", category._id);

                  case 6:
                  case "end":
                    return _context.stop();
                }
              }
            });
          })));

        case 2:
          categoryIds = _context2.sent;
          return _context2.abrupt("return", categoryIds);

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.getCategoryIdsFromNames = getCategoryIdsFromNames;