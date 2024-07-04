const express = require("express");
const router = express.Router();
const { middlewares, isAdmin } = require("../middlewares/middlewres");
const movieController = require("../controllers/movie.controller");

/**
 * @swagger
 * tags:
 *   name: Movie
 *   description: The movie managing API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Movie:
 *       type: object
 *       required:
 *         - title
 *         - genre
 *         - duration
 *         - release_date
 *         - director
 *         - description
 *         - poster
 *         - status
 *       properties:
 *         title:
 *           type: string
 *         genre:
 *           type: string
 *         duration:
 *           type: string
 *         release_date:
 *           type: string
 *         director:
 *           type: string
 *         description:
 *           type: string
 *         poster:
 *           type: string
 *         status:
 *           type: string
 *           enum:
 *             - upcoming
 *             - now_showing
 */

/**
 * @swagger
 * /movies:
 *   get:
 *     tags:
 *       - Movie
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
router.get("/movies", movieController.getAllMovies);

/**
 * @swagger
 * /movies/{id}:
 *   get:
 *     tags:
 *       - Movie
 *     summary: Get a movie by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The movie ID
 *     responses:
 *       200:
 *         description: A single movie
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       404:
 *         description: Movie not found
 */
router.get("/movies/:id", movieController.getMovieById);

/**
 * @swagger
 * /movies:
 *   post:
 *     tags:
 *       - Movie
 *     summary: Create a new movie
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       201:
 *         description: Movie created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       400:
 *         description: Invalid input
 */
router.post("/movies", middlewares, isAdmin, movieController.createMovie);

/**
 * @swagger
 * /movies/{id}:
 *   put:
 *     tags:
 *       - Movie
 *     summary: Update a movie
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The movie ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       200:
 *         description: Movie updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       404:
 *         description: Movie not found
 *       400:
 *         description: Invalid input
 */
router.put("/movies/:id", movieController.updateMovie);

/**
 * @swagger
 * /movies/{id}:
 *   delete:
 *     tags:
 *       - Movie
 *     summary: Delete a movie
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The movie ID
 *     responses:
 *       200:
 *         description: Movie deleted successfully
 *       404:
 *         description: Movie not found
 */
router.delete("/movies/:id", movieController.deleteMovie);
router.get("/", movieController.getAllMovies);
router.get("/:id", movieController.getMovieById);

module.exports = router;
