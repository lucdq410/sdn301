var express = require("express");
var router = express.Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: The User managing API
 */

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

module.exports = router;
