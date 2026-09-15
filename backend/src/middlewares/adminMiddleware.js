export default function adminMiddleware(req, res, next) {
  if (!req.user) {
    return res.status(401).json({
      message: "Usuário não autenticado"
    });
  }

  if (!req.user.isAdmin) {
    return res.status(403).json({
      message: "Acesso negado. Apenas administradores podem acessar esta rota."
    });
  }

  next();
}