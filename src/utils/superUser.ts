import bcrypt from "bcryptjs";
import { prisma } from "../app";

async function makeSuperUser() {
  const existed = await prisma.user.findFirst({ where: { username: "admin" } });
  if (existed) {
    return true;
  }
  const superUser = await prisma.user.create({
    data: {
      username: "admin",
      password: await bcrypt.hash("admin", 10),
      email: "admin@super",
      role: 1,
    },
  });
  return true;
}
makeSuperUser().then(() => console.log("Super user created"));
