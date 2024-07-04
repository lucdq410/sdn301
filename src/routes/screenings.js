const express = require("express");
const router = express.Router();
const { middlewares, isAdmin } = require("../middlewares/middlewres");
const screeningController = require("../controllers/screening.controller");
/**
 * @swagger
 * tags:
 *   name: Screening
 *   description: The Screening managing API
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Screening:
 *       type: object
 *       required:
 *         - movie
 *         - hall
 *         - startTime
 *         - endTime
 *       properties:
 *         movie:
 *           type: string
 *           description: The name of the movie
 *         hall:
 *           type: string
 *           description: The ID of the hall
 *         startTime:
 *           type: string
 *           format: date-time
 *         endTime:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /screenings:
 *   post:
 *     tags:
 *       - Screening
 *     summary: Create a new screening
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Screening'
 *     responses:
 *       200:
 *         description: Screening created successfully or an error occurred
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Screening'
 */
router.post(
  "/screenings",
  middlewares,
  isAdmin,
  screeningController.createScreening
);

module.exports = router;
