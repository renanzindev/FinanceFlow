import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// Função para fazer a chamada de API (pode ser movida para um helper/service)
async function loginUserApi(credentials) {
  const response = await fetch("/api/auth/login", { // Presume que o backend está em /api
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Falha no login");
  }
  return data;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Tentativa de login com admin/admin (lógica de teste)
    if (email === "admin" && password === "admin") {
      try {
        const data = await loginUserApi({ email: "admin", password: "admin" });
        localStorage.setItem("userInfo", JSON.stringify(data)); // Armazena o token e dados do usuário
        navigate("/dashboard"); // Redireciona para o dashboard
      } catch (err) {
        setError(err.message || "Falha ao logar como admin.");
      }
      setLoading(false);
      return;
    }

    // Login normal
    try {
      const data = await loginUserApi({ email, password });
      localStorage.setItem("userInfo", JSON.stringify(data)); // Armazena o token e dados do usuário
      // TODO: Idealmente, o token JWT deve ser usado para chamadas subsequentes
      // e o estado de autenticação gerenciado globalmente (Context API, Redux, Zustand, etc.)
      navigate("/dashboard"); // Redireciona para o dashboard
    } catch (err) {
      setError(err.message || "E-mail dasddadasdados.");
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">FinanceFlow</CardTitle>
          <CardDescription>Acesse sua conta para gerenciar suas finanças.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="text"
                placeholder="seuemail@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            {error && <p className="text-sm text-red-500 text-center">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center text-sm">
          <p>Não tem uma conta? {
            // TODO: Adicionar link para página de registro quando criada
            // <Link to="/register" className="text-primary hover:underline">Registre-se</Link>
          }
            <span className="text-muted-foreground">Entre em contato com o suporte.</span>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

