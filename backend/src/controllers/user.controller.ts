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
  auth: async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      const user = await prisma.user.findUnique({
        where: {
          email: email,
          AND: {
            password: password,
          },
        },
      });

      if (!user) return res.status(404).json("usuario não encontrado");

      return res.json({ message: "usuario encontrado", user });
    } catch (error) {
      return res.status(500).json("erro no servidor");
    }
  },
  deleteUser: async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: "id não existe" });

    try {
      const user = await prisma.user.delete({
        where: {
          id: Number(id),
        },
      });

      return res.json({ message: "usuario deletado", user });
    } catch (error) {
      return res.status(500).json({ message: "erro ao deletar usuario" });
    }

  },
  update: async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!id) return res.status(400).json({ message: "id não existe" });
    if (!name) return res.status(400).json({ message: "nome não existe" });

    try {
      const user = await prisma.user.update({
        where: {
          id: Number(id),
        },
        data: {
          name: name,
        },
      });

      return res.json({ message: "usuario atualizado", user });
    } catch (error) {
      return res.status(500).json({ message: "erro ao atualizar usuario" });
    }
  },
};

export default userController;
