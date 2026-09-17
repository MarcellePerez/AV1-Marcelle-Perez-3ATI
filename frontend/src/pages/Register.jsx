import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api.js";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  
  function handleRegister(event) {
  event.preventDefault();

  setError("");
  setSuccess("");

  if (!name || !email || !password) {
    setError("Preencha todos os campos.");
    return;
  }

  setLoading(true);

  api.post("/auth/register", {
    name,
    email,
    password,
  })
    .then((response) => {
      console.log("Cadastro realizado:", response.data);

      setSuccess("Cadastro realizado com sucesso!");

      setName("");
      setEmail("");
      setPassword("");
    })
    .catch((error) => {
      console.error("Erro no cadastro:", error);

   if (error.response?.data?.message) {
  setError(error.response.data.message);
} else if (error.response?.data?.mensagem) {
  setError(error.response.data.mensagem);
} else {
  setError("Não foi possível realizar o cadastro.");
}
    })
    .finally(() => {
      setLoading(false);
    });
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
          Criar conta
        </h1>

        <p className="mt-2 text-sm text-gray-300">
          Crie sua conta para começar
        </p>
      </div>

      {/* Formulário */}
      <form onSubmit={handleRegister} className="space-y-5">

        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-gray-200"
          >
            Nome
          </label>

          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Seu nome"
            className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-red-700 focus:ring-2 focus:ring-red-950/50"
          />
        </div>

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
            autoComplete="new-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Crie uma senha"
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

        {success && (
          <p
            role="status"
            className="rounded-xl border border-green-500/20 bg-green-950/40 p-3 text-sm text-green-300"
          >
            {success}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-red-950 px-4 py-3 font-semibold text-white shadow-lg shadow-red-950/30 transition hover:bg-red-900 hover:shadow-red-900/40 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>

      </form>

      {/* Login */}
      <p className="mt-7 text-center text-sm text-gray-300">
        Já tem uma conta?{" "}
        <Link
          to="/login"
          className="font-semibold text-red-400 transition hover:text-red-300 hover:underline"
        >
          Entrar
        </Link>
      </p>

    </section>

  </main>
);
}
