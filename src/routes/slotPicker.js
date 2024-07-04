const express = require("express");
const router = express.Router();
const slotPickerController = require("../controllers/slotPicker.controller");

/**
 * @swagger
 * tags:
 *   name: SlotPicker
 *   description: APIs for managing slot pickers
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SlotPicker:
 *       type: object
 *       required:
 *         - seat_id
 *         - screening_id
 *       properties:
 *         seat_id:
 *           type: string
 *         screening_id:
 *           type: string
 *         is_available:
 *           type: boolean
 */

/**
 * @swagger
 * /slotpicker:
 *   post:
 *     tags:
 *       - SlotPicker
 *     summary: Create a new slot picker entry
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SlotPicker'
 *     responses:
 *       201:
 *         description: Slot picker created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SlotPicker'
 *       400:
 *         description: Invalid input
 */
router.post("/", slotPickerController.createSlotPicker);

module.exports = router;
