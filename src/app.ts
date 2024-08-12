import express from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import userRoutes from "./routes/userRoutes";
import bookRoutes from "./routes/bookRoutes";
import { setupSwagger } from "./swagger";

dotenv.config();

const app = express();
app.use(express.json());

export const prisma = new PrismaClient();

app.use("/users", userRoutes);
app.use("/books", bookRoutes);

setupSwagger(app);

export default app;
