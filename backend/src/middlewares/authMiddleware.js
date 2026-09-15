import jwt from "jsonwebtoken";
import prisma from "../prismaClient.js";

export default async function authMiddleware(req, res, next) {
  try {
    // Pegar o Authorization
    const authHeader = req.headers.authorization;

    // Verificar se o token foi enviado
    if (!authHeader) {
      return res.status(401).json({
        message: "Token não informado"
      });
    }

    // Separar Bearer do token
    const partes = authHeader.split(" ");

    if (partes.length !== 2 || partes[0] !== "Bearer") {
      return res.status(401).json({
        message: "Formato do token inválido"
      });
    }

    const token = partes[1];

    // Verificar o token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Buscar usuário pelo ID que está no token
    const usuario = await prisma.user.findUnique({
      where: {
        id: decoded.id
      }
    });

    // Usuário não existe
    if (!usuario) {
      return res.status(401).json({
        message: "Usuário não encontrado"
      });
    }

    // Colocar usuário na requisição
    req.user = usuario;

    // Liberar acesso
    next();

  } catch (error) {
    console.error("Erro no middleware:", error);

    return res.status(401).json({
      message: "Token inválido ou expirado"
    });
  }
}