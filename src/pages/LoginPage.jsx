import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "@/api/authService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";


/*
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
/*/

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
    // Verificar se o usuário já está autenticado
    if (authService.isAuthenticated()) {
      navigate("/dashboard");
    }
  }, [navigate]);
  console.log("true");
  
  const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError("");

  
      try {
        await authService.login(email, password);
        navigate("/dashboard");
      } catch (error) {
        console.error("Erro de login:", error);
        setError(error.message || "Falha na autenticação. Verifique suas credenciais.");
      } finally {
        setLoading(false);
      }
    };
  
  /*    // Tentativa de login com admin/admin (lógica de teste)
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
/*/
    // Login normal
  /*  try {
      const data = await loginUserApi({ email, password });
      localStorage.setItem("userInfo", JSON.stringify(data)); // Armazena o token e dados do usuário
      // TODO: Idealmente, o token JWT deve ser usado para chamadas subsequentes
      // e o estado de autenticação gerenciado globalmente (Context API, Redux, Zustand, etc.)
      navigate("/dashboard"); // Redireciona para o dashboard
    } catch (err) {
      setError(err.message || "E-mail ou senha inválidos.");
    }
    setLoading(false);
  };
  /*/

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md p-4">
        <Card className="w-full">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">FinanceFlow</CardTitle>
            <CardDescription>
              Entre com suas credenciais para acessar o sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <ExclamationTriangleIcon className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="text"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Senha</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Entrando..." : "Entrar"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="text-center text-sm text-muted-foreground">
            <p className="w-full">
              Para teste, use: <strong>admin</strong> / <strong>admin</strong>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
