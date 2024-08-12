import { Router } from "express";
import {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from "../controller/bookController";
import { authenticate, authorizeAdmin } from "../middlewares/auth";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: API for managing books
 */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: List of all books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   author:
 *                     type: string
 *                   publicationDate:
 *                     type: string
 *                     format: date-time
 *                   genres:
 *                     type: array
 *                     items:
 *                       type: string
 */
router.get("/", getBooks);

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get a book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The book ID
 *     responses:
 *       200:
 *         description: The book data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 author:
 *                   type: string
 *                 publicationDate:
 *                   type: string
 *                   format: date-time
 *                 genres:
 *                   type: array
 *                   items:
 *                     type: string
 *       404:
 *         description: Book not found
 */
router.get("/:id", getBookById);

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               publicationDate:
 *                 type: string
 *                 format: date-time
 *               genres:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: The created book
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 author:
 *                   type: string
 *                 publicationDate:
 *                   type: string
 *                   format: date-time
 *                 genres:
 *                   type: array
 *                   items:
 *                     type: string
 *       403:
 *         description: Forbidden
 */
router.post("/", authenticate, authorizeAdmin, createBook);
/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update a book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The book ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               publicationDate:
 *                 type: string
 *                 format: date-time
 *               genres:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: The updated book
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 author:
 *                   type: string
 *                 publicationDate:
 *                   type: string
 *                   format: date-time
 *                 genres:
 *                   type: array
 *                   items:
 *                     type: string
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Book not found
 */
router.put("/:id", authenticate, authorizeAdmin, updateBook);

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete a book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The book ID
 *     responses:
 *       204:
 *         description: No Content
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Book not found
 */
router.delete("/:id", authenticate, authorizeAdmin, deleteBook);

export default router;
