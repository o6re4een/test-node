import { Router } from "express";
import {
  registerUser,
  loginUser,
  getCurrentUser,
  updateUserRole,
} from "../controller/userController";
import { authenticate, authorizeAdmin } from "../middlewares/auth";

const router = Router();

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: The created user.
 *       400:
 *         description: Bad request.
 */
router.post("/register", registerUser);
/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login, returns a JWT token.
 *       401:
 *         description: Invalid credentials.
 */
router.post("/login", loginUser);

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Get current user information
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The user data.
 *       401:
 *         description: Unauthorized.
 */
router.get("/me", authenticate, getCurrentUser);
/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Get current user information
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The user data.
 *       401:
 *         description: Unauthorized.
 */
router.put("/:id/role", authenticate, authorizeAdmin, updateUserRole);

export default router;
