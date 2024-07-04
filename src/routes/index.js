var express = require("express");
var router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: The authentication managing API
 */

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;
