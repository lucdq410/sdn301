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
 * /slotpicker/screening/{screening_id}:
 *   get:
 *     tags:
 *       - SlotPicker
 *     summary: Fetch slot pickers by screening ID
 *     parameters:
 *       - in: path
 *         name: screening_id
 *         schema:
 *           type: string
 *         required: true
 *         description: Screening ID
 *     responses:
 *       200:
 *         description: Slot pickers fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SlotPicker'
 *       400:
 *         description: Invalid input
 */
router.get(
  "/screening/:screening_id",
  slotPickerController.getSlotPickersByScreeningId
);

/**
 * @swagger
 * /slotpicker/{id}:
 *   patch:
 *     tags:
 *       - SlotPicker
 *     summary: Edit the availability status of a slot picker entry
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Slot picker ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               is_available:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Slot picker availability updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SlotPicker'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Slot picker not found
 */
router.patch("/:id", slotPickerController.editSlotPickerAvailability);

module.exports = router;
