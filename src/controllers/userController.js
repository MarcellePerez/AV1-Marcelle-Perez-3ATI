export async function getProfile(req, res) {
  return res.status(200).json({
    message: "Perfil acessado com sucesso",
    user: {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    }
  });
}