const express = require("express");
const router = express.Router();
const screeningController = require("../controllers/screening.controller");

/**
 * @swagger
 * tags:
 *   name: Screening
 *   description: API endpoints for managing screenings
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
 *           description: The ID of the movie for the screening
 *         hall:
 *           type: string
 *           description: The ID of the hall for the screening
 *         startTime:
 *           type: string
 *           format: date-time
 *           description: The start time of the screening
 *         endTime:
 *           type: string
 *           format: date-time
 *           description: The end time of the screening
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
 *       201:
 *         description: Screening created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Screening'
 *       400:
 *         description: Invalid input or missing fields
 */
router.post("/", screeningController.createScreening);
// Endpoint để xóa screening
router.delete("/:id", screeningController.deleteScreening);
// Endpoint để lấy tất cả screenings
router.get("/", screeningController.getAllScreenings);

// Endpoint để cập nhật screening
router.put("/:id", screeningController.updateScreening);
// Endpoint get by id
router.get("/:id", screeningController.getScreeningById);
router.get("/movie/:movieId", screeningController.getScreeningsByMovieId);

module.exports = router;
