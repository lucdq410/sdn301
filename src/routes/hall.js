const express = require("express");
const router = express.Router();
const hallController = require("../controllers/hall.controller");

/**
 * @swagger
 * tags:
 *   name: Hall
 *   description: APIs for managing halls
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Hall:
 *       type: object
 *       required:
 *         - name
 *         - capacity
 *       properties:
 *         name:
 *           type: string
 *         capacity:
 *           type: integer
 *           format: int32
 *         status:
 *           type: string
 *           enum: [active, inactive]
 *           default: active
 */

/**
 * @swagger
 * /halls:
 *   get:
 *     tags:
 *       - Hall
 *     summary: Get all halls
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
router.get("/", hallController.getAllHalls);

/**
 * @swagger
 * /halls/{id}:
 *   get:
 *     tags:
 *       - Hall
 *     summary: Get a hall by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The hall ID
 *     responses:
 *       200:
 *         description: A single hall
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Hall'
 *       404:
 *         description: Hall not found
 */
router.get("/:id", hallController.getHallById);

/**
 * @swagger
 * /halls:
 *   post:
 *     tags:
 *       - Hall
 *     summary: Create a new hall
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Hall'
 *     responses:
 *       201:
 *         description: Hall created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Hall'
 *       400:
 *         description: Invalid input
 */
router.post("/", hallController.createHall);

/**
 * @swagger
 * /halls/{id}:
 *   put:
 *     tags:
 *       - Hall
 *     summary: Update a hall
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The hall ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Hall'
 *     responses:
 *       200:
 *         description: Hall updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Hall'
 *       404:
 *         description: Hall not found
 *       400:
 *         description: Invalid input
 */
router.put("/:id", hallController.updateHall);

/**
 * @swagger
 * /halls/{id}:
 *   delete:
 *     tags:
 *       - Hall
 *     summary: Delete a hall
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The hall ID
 *     responses:
 *       200:
 *         description: Hall deleted successfully
 *       404:
 *         description: Hall not found
 */
router.delete("/:id", hallController.deleteHall);

/**
 * @swagger
 * /halls/{id}/seats:
 *   get:
 *     tags:
 *       - Hall
 *     summary: Get seats of a hall by hall ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The hall ID
 *     responses:
 *       200:
 *         description: A list of seats
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Seat'
 *       404:
 *         description: Hall not found
 */
router.get("/:id/seats", hallController.getSeatsByHallId);

module.exports = router;
