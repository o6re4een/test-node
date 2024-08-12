import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../app";

export const registerUser = async (req: Request, res: Response) => {
  const { username, password, email } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { username, password: hashedPassword, email, role: 0 },
  });

  // TODO: Use nodemailer for email verification

  res.status(201).json(user);
};

export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await prisma.user.findUnique({ where: { username } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).send({ error: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET!
  );
  res.json({ token });
};

export const getCurrentUser = async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: { id: (req as any).user.id },
  });
  res.json(user);
};

export const updateUserRole = async (req: Request, res: Response) => {
  const { role } = req.body;

  const updatedUser = await prisma.user.update({
    where: { id: parseInt(req.params.id) },
    data: { role },
  });

  res.json(updatedUser);
};
