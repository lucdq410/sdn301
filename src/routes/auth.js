var express = require("express");
var router = express.Router();
const { register, login } = require("../controllers/auther.controller");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: The authentication managing API
 */

/**
 * @swagger
 * /auther/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Registers a new user
 *     description: Create a new user account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *             example:
 *               email: quangluc@gmail.com
 *               password: 12345678@
 *               confirmPassword: 12345678@
 *               name: quangLuc2002
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     user_name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     password:
 *                       type: string
 *                     role:
 *                       type: string
 *                     phone:
 *                       type: string
 *                 isSuccess:
 *                   type: boolean
 *       400:
 *         description: Invalid input
 */

/**
 * @swagger
 * /auther/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Logs in a user
 *     description: Authenticate a user and return a token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               email: quangluc@gmail.com
 *               password: 12345678@
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 message:
 *                   type: string
 *                 isSuccess:
 *                   type: boolean
 *       400:
 *         description: Invalid credentials
 */

router.post("/register", register);
router.post("/login", login);

module.exports = router;
