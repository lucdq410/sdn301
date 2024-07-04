const express = require("express");
const router = express.Router();
const { isAdmin } = require("../middlewares/middlewres");
const bookingController = require("../../src/controllers/booking.controllers");

/**
 * @swagger
 * tags:
 *   name: Booking
 *   description: APIs for managing booking information
 */

/**
 * @swagger
 * /booking/cinemas:
 *   get:
 *     tags:
 *       - Booking
 *     summary: Get all cinemas
 *     responses:
 *       200:
 *         description: A list of cinemas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cinema'
 */
router.get("/booking/cinemas", bookingController.getAllCinemas);

/**
 * @swagger
 * /booking/cinemas/{cinemaId}/halls:
 *   get:
 *     tags:
 *       - Booking
 *     summary: Get halls by cinema ID
 *     parameters:
 *       - in: path
 *         name: cinemaId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the cinema
 *     responses:
 *       200:
 *         description: A list of halls
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Hall'
 */
router.get(
  "/booking/cinemas/:cinemaId/halls",
  bookingController.getHallsByCinemaId
);

/**
 * @swagger
 * /booking/movies:
 *   get:
 *     tags:
 *       - Booking
 *     summary: Get all movies
 *     responses:
 *       200:
 *         description: A list of movies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 */
router.get("/booking/movies", bookingController.getAllMovies);

/**
 * @swagger
 * /booking/halls/{hallId}/screenings:
 *   get:
 *     tags:
 *       - Booking
 *     summary: Get screenings by hall ID
 *     parameters:
 *       - in: path
 *         name: hallId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the hall
 *     responses:
 *       200:
 *         description: A list of screenings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Screening'
 */
router.get(
  "/booking/halls/:hallId/screenings",
  bookingController.getScreeningsByHallId
);

module.exports = router;
