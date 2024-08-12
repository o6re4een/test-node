import { Request, Response } from "express";
import { prisma } from "../app";

export const getBooks = async (req: Request, res: Response) => {
  const books = await prisma.book.findMany();
  res.json(books);
};

export const getBookById = async (req: Request, res: Response) => {
  const book = await prisma.book.findUnique({
    where: { id: parseInt(req.params.id) },
  });

  if (!book) {
    return res.status(404).send({ error: "Book not found" });
  }

  res.json(book);
};

export const createBook = async (req: Request, res: Response) => {
  const { title, author, publicationDate, genres } = req.body;

  const book = await prisma.book.create({
    data: {
      title,
      author,
      publicationDate: new Date(publicationDate),
      genres,
      userId: (req as any).user.id,
    },
  });

  res.status(201).json(book);
};

export const updateBook = async (req: Request, res: Response) => {
  const { title, author, publicationDate, genres } = req.body;

  const updatedBook = await prisma.book.update({
    where: { id: parseInt(req.params.id) },
    data: { title, author, publicationDate: new Date(publicationDate), genres },
  });

  res.json(updatedBook);
};

export const deleteBook = async (req: Request, res: Response) => {
  await prisma.book.delete({ where: { id: parseInt(req.params.id) } });
  res.status(204).send();
};
