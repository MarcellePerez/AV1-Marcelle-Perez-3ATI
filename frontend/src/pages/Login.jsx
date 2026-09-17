import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api.js";
import { saveToken } from "../services/auth.js";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();

    // Limpa erro anterior
    setError("");

    // Validação dos campos
    if (!email || !password) {
      setError("Email e senha são obrigatórios.");
      return;
    }

    setLoading(true);

    try {
      // Envia email e senha para o backend
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      // Pega o token retornado pelo backend
      const token = response.data.token;

      // Verifica se o backend realmente retornou um token
      if (!token) {
        setError("Token não recebido pelo servidor.");
        return;
      }

      // Salva o JWT no localStorage
      saveToken(token);

      // Vai para a página protegida
      navigate("/perfil");

    } catch (error) {
      console.error("Erro no login:", error);

      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else if (error.response?.data?.mensagem) {
        setError(error.response.data.mensagem);
      } else {
        setError("Email ou senha inválidos.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
  <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-red-950 px-4 py-8">

    <section className="w-full max-w-md rounded-2xl border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">

      {/* Título */}
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-950 shadow-lg shadow-red-950/40">
          <span className="text-2xl text-white">✦</span>
        </div>

        <h1 className="text-3xl font-bold text-white">
          Bem-vindo!
        </h1>

        <p className="mt-2 text-sm text-gray-300">
          Entre na sua conta para continuar
        </p>
      </div>

      {/* Formulário */}
      <form onSubmit={handleLogin} className="space-y-5">

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-gray-200"
          >
            Email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="seuemail@email.com"
            className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-red-700 focus:ring-2 focus:ring-red-950/50"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-gray-200"
          >
            Senha
          </label>

          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Digite sua senha"
            className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-red-700 focus:ring-2 focus:ring-red-950/50"
          />
        </div>

        {error && (
          <p
            role="alert"
            className="rounded-xl border border-red-500/20 bg-red-950/40 p-3 text-sm text-red-200"
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-red-950 px-4 py-3 font-semibold text-white shadow-lg shadow-red-950/30 transition hover:bg-red-900 hover:shadow-red-900/40 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>

      </form>

      {/* Cadastro */}
      <p className="mt-7 text-center text-sm text-gray-300">
        Ainda não tem uma conta?{" "}
        <Link
          to="/register"
          className="font-semibold text-red-400 transition hover:text-red-300 hover:underline"
        >
          Criar conta
        </Link>
      </p>

    </section>

  </main>
);
}