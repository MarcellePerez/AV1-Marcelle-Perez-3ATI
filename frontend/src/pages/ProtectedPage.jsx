import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api.js";
import { getToken, removeToken } from "../services/auth.js";

export default function ProtectedPage() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function loadProfile() {
    const token = getToken();

    if (!token) {
      navigate("/login");
      return;
    }

    setLoading(true);
    setError("");

    api.get("/perfil", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setUser(response.data.user);
      })
      .catch((error) => {
        console.error("Erro ao carregar perfil:", error);

        if (error.response?.status === 401) {
          removeToken();
          navigate("/login");
          return;
        }

        setError("Não foi possível carregar o perfil.");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleLogout() {
    removeToken();
    navigate("/login");
  }

  useEffect(() => {
    loadProfile();
  }, []);

  return (
  <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-red-950 px-4 py-8">

    <section className="w-full max-w-lg rounded-2xl border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">

      {/* Cabeçalho */}
      <div className="mb-8 text-center">

        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-950 shadow-lg shadow-red-950/40">
          <span className="text-2xl text-white">✦</span>
        </div>

        <h1 className="text-3xl font-bold text-white">
          Área Protegida
        </h1>

        <p className="mt-2 text-sm text-gray-300">
          Você está conectado com segurança
        </p>

      </div>

      {/* Mensagem de sucesso */}
      <div
        role="status"
        className="mb-5 rounded-xl border border-green-500/20 bg-green-950/40 p-3 text-center text-sm text-green-300"
      >
        Login realizado com sucesso
      </div>

      {/* Dados do usuário */}
      <div className="mb-6 rounded-xl border border-white/10 bg-black/20 p-5">

        <h2 className="mb-4 text-lg font-semibold text-white">
          Dados do usuário
        </h2>

        <div className="space-y-4">

          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
              ID
            </p>

            <p className="mt-1 text-white">
              {user?.id ?? "Aguardando perfil"}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
              Nome
            </p>

            <p className="mt-1 text-white">
              {user?.name ?? "Aguardando perfil"}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
              Email
            </p>

            <p className="mt-1 break-all text-white">
              {user?.email ?? "Aguardando perfil"}
            </p>
          </div>

        </div>

      </div>

      {/* Loading */}
      {loading && (
        <p
          role="status"
          className="mb-4 text-center text-sm text-gray-300"
        >
          Carregando perfil...
        </p>
      )}

      {/* Erro */}
      {error && (
        <p
          role="alert"
          className="mb-4 rounded-xl border border-red-500/20 bg-red-950/40 p-3 text-center text-sm text-red-200"
        >
          {error}
        </p>
      )}

      {/* Botão sair */}
      <button
        type="button"
        onClick={handleLogout}
        className="w-full rounded-xl bg-red-950 px-4 py-3 font-semibold text-white shadow-lg shadow-red-950/30 transition hover:bg-red-900 hover:shadow-red-900/40"
      >
        Sair
      </button>

    </section>

  </main>
);  
}