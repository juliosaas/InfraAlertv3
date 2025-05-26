import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const userController = {
  listAll: async (req: Request, res: Response) => {
    const users = await prisma.user.findMany();
    return res.json({ message: users });
  },
  createuser: async (req: Request, res: Response) => {
    const { nome, email, senha } = req.body;

    if (!nome) return res.status(400).json({ message: "nome não existe" });
    if (!email) return res.status(400).json({ message: "email não existe" });
    if (!senha) return res.status(400).json({ message: "senha não existe" });

    try {
      const user = await prisma.user.create({
        data: {
          name: nome,
          email: email,
          password: senha,
        },
      });

      return res.json({ message: "usuario criado", user });
    } catch (error) {
      return res.json({ message: "deu ruim, não criou" });
    }
  },
};

export default userController;
