const express = require("express");
const router = express.Router();
const ticketController = require("../controllers/ticket.controller");

/**
 * @swagger
 * tags:
 *   name: Ticket
 *   description: APIs for managing tickets
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Ticket:
 *       type: object
 *       required:
 *         - slotPicker_id
 *         - user_id
 *         - seat_number
 *         - purchase_date
 *         - price
 *       properties:
 *         slotPicker_id:
 *           type: string
 *         user_id:
 *           type: string
 *         seat_number:
 *           type: string
 *         purchase_date:
 *           type: string
 *           format: date
 *         price:
 *           type: number
 *           format: float
 */

/**
 * @swagger
 * /tickets:
 *   get:
 *     tags:
 *       - Ticket
 *     summary: Get all tickets
 *     responses:
 *       200:
 *         description: A list of tickets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ticket'
 */
router.get("/", ticketController.getAllTickets);

/**
 * @swagger
 * /tickets/{id}:
 *   get:
 *     tags:
 *       - Ticket
 *     summary: Get a ticket by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ticket ID
 *     responses:
 *       200:
 *         description: A single ticket
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ticket'
 *       404:
 *         description: Ticket not found
 */
router.get("/:id", ticketController.getTicketById);

/**
 * @swagger
 * /tickets:
 *   post:
 *     tags:
 *       - Ticket
 *     summary: Create a new ticket
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ticket'
 *     responses:
 *       201:
 *         description: Ticket created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ticket'
 *       400:
 *         description: Invalid input
 */
router.post("/", ticketController.createTicket);

/**
 * @swagger
 * /tickets/{id}:
 *   put:
 *     tags:
 *       - Ticket
 *     summary: Update a ticket
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ticket ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ticket'
 *     responses:
 *       200:
 *         description: Ticket updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ticket'
 *       404:
 *         description: Ticket not found
 *       400:
 *         description: Invalid input
 */
router.put("/:id", ticketController.updateTicket);

/**
 * @swagger
 * /tickets/{id}:
 *   delete:
 *     tags:
 *       - Ticket
 *     summary: Delete a ticket
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ticket ID
 *     responses:
 *       200:
 *         description: Ticket deleted successfully
 *       404:
 *         description: Ticket not found
 */
router.delete("/:id", ticketController.deleteTicket);

module.exports = router;
