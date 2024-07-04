const express = require("express");
const router = express.Router();
const seatController = require("../controllers/seat.controller");

/**
 * @swagger
 * tags:
 *   name: Seat
 *   description: APIs for managing seats in halls
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Seat:
 *       type: object
 *       required:
 *         - hall_id
 *         - price
 *         - seat_number
 *         - is_available
 *       properties:
 *         hall_id:
 *           type: string
 *         price:
 *           type: string
 *         seat_number:
 *           type: string
 *         is_available:
 *           type: boolean
 */

/**
 * @swagger
 * /seats:
 *   get:
 *     tags:
 *       - Seat
 *     summary: Get all seats
 *     responses:
 *       200:
 *         description: A list of seats
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Seat'
 */
router.get("/seats", seatController.getAllSeats);

/**
 * @swagger
 * /seats/{hallId}:
 *   get:
 *     tags:
 *       - Seat
 *     summary: Get seats by hall ID
 *     parameters:
 *       - in: path
 *         name: hallId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the hall to get seats from
 *     responses:
 *       200:
 *         description: A list of seats
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Seat'
 */
router.get("/seats/:hallId", seatController.getSeatsByHallId);

/**
 * @swagger
 * /seats:
 *   post:
 *     tags:
 *       - Seat
 *     summary: Create a new seat
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Seat'
 *     responses:
 *       201:
 *         description: Seat created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Seat'
 *       400:
 *         description: Invalid input
 */
router.post("/seats", seatController.createSeat);

/**
 * @swagger
 * /seats/{id}:
 *   put:
 *     tags:
 *       - Seat
 *     summary: Update a seat
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the seat to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Seat'
 *     responses:
 *       200:
 *         description: Seat updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Seat'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Seat not found
 */
router.put("/seats/:id", seatController.updateSeat);

/**
 * @swagger
 * /seats/{id}:
 *   delete:
 *     tags:
 *       - Seat
 *     summary: Delete a seat
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the seat to delete
 *     responses:
 *       200:
 *         description: Seat deleted successfully
 *       404:
 *         description: Seat not found
 */
router.delete("/seats/:id", seatController.deleteSeat);

module.exports = router;
