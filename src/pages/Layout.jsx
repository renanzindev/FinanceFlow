import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Home, PieChart, CreditCard, Calendar, Settings, 
  TrendingUp, Menu, X, Moon, Sun, DollarSign,
  Users, FileSpreadsheet, LogOut
} from "lucide-react";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
// Não vamos mais importar User de @/api/entities diretamente para User.me() no frontend
// A lógica de autenticação e obtenção de dados do usuário será via API

async function fetchApi(url, options = {}) {
  const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const response = await fetch(url, { ...options, headers });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || `Falha na requisição para ${url}`);
  }
  return data;
}

export default function Layout({ children, currentPageName }) {
  const [darkMode, setDarkMode] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState(""); // Adicionado para exibir email
  const [userRole, setUserRole] = useState("user");
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoadingUser(true);
      try {
        // Busca os dados do usuário da API /api/auth/me
        const userData = await fetchApi("/api/auth/me"); 
        setUserName(userData.full_name || "");
        setUserEmail(userData.email || "");
        setUserRole(userData.role || "user");
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Se falhar ao buscar dados do usuário (ex: token inválido), redireciona para login
        localStorage.removeItem("userInfo");
        navigate("/login");
      }
      setIsLoadingUser(false);
    };

    const userInfo = localStorage.getItem("userInfo");
    if (!userInfo) {
      navigate("/login");
    } else {
      fetchUserData();
    }
    
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, [navigate, location.pathname]); // Adicionado location.pathname para re-fetch se necessário

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };
  
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  const menuItems = [
    { name: "Dashboard", icon: Home, link: createPageUrl("Dashboard") },
    { name: "Contas", icon: CreditCard, link: createPageUrl("Accounts") },
    { name: "Cartões", icon: CreditCard, link: createPageUrl("CreditCards") },
    { name: "Transações", icon: DollarSign, link: createPageUrl("Transactions") },
    { name: "Relatórios", icon: PieChart, link: createPageUrl("Reports") },
    { name: "Calendário", icon: Calendar, link: createPageUrl("Calendar") },
    { name: "Importar/Exportar", icon: FileSpreadsheet, link: createPageUrl("ImportExport") }
  ];
  
  if (userRole === "admin") {
    menuItems.push({ name: "Administração", icon: Settings, link: createPageUrl("Admin") });
    menuItems.push({ name: "Usuários", icon: Users, link: createPageUrl("Users") });
  }
  menuItems.push({ name: "Configurações", icon: Settings, link: createPageUrl("Settings") });

  if (isLoadingUser) {
    // Pode adicionar um spinner de carregamento aqui
    return <div className="flex items-center justify-center min-h-screen">Carregando...</div>;
  }

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? "dark" : ""}`}>
      <style global>{`
        :root {
          --primary: 250 95% 59%;
          --primary-foreground: 0 0% 100%;
          --background: 0 0% 100%;
          --foreground: 222 47% 11%;
          --card: 0 0% 100%;
          --card-foreground: 222 47% 11%;
          --popover: 0 0% 100%;
          --popover-foreground: 222 47% 11%;
          --secondary: 210 40% 96%;
          --secondary-foreground: 222 47% 11%;
          --muted: 210 40% 96%;
          --muted-foreground: 215 16% 47%;
          --accent: 210 40% 96%;
          --accent-foreground: 222 47% 11%;
          --destructive: 0 84% 60%;
          --destructive-foreground: 210 40% 98%;
          --border: 214 32% 91%;
          --input: 214 32% 91%;
          --ring: 222 47% 11%;
          --radius: 0.5rem;
        }
        .dark {
          --background: 0 0% 6.3%;
          --foreground: 210 40% 98%;
          --card: 0 0% 8.3%;
          --card-foreground: 210 40% 98%;
          --popover: 0 0% 8.3%;
          --popover-foreground: 210 40% 98%;
          --primary: 250 95% 65%;
          --primary-foreground: 210 40% 98%;
          --secondary: 0 0% 12%;
          --secondary-foreground: 210 40% 98%;
          --muted: 0 0% 12%;
          --muted-foreground: 215 20% 75%;
          --accent: 0 0% 12%;
          --accent-foreground: 210 40% 98%;
          --destructive: 0 84% 60%;
          --destructive-foreground: 210 40% 98%;
          --border: 0 0% 15%;
          --input: 0 0% 15%;
          --ring: 212.7 26.8% 83.9%;
        }
        body {
          color: hsl(var(--foreground));
          background: hsl(var(--background));
          transition: background-color 0.3s ease;
        }
        .dark .text-muted-foreground { color: hsl(215 20% 75%); }
        .dark .border-border\/40 { border-color: hsl(0 0% 20% / 0.4); }
        .Dialog { max-height: 90vh; overflow: hidden; }
        .text-white { color: #ffffff; }
      `}</style>

      <div className="flex h-screen">
        <aside className="hidden lg:flex h-screen w-64 flex-col fixed inset-y-0 z-50 border-r border-border/40 bg-card">
          <div className="p-6">
            <div className="flex items-center gap-2 font-bold text-xl text-foreground">
              <DollarSign className="w-6 h-6 text-primary" />
              <span>Finance Flow</span>
            </div>
          </div>
          <div className="mt-2 px-3 flex-grow">
            <nav className="space-y-1">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.link || (item.link === "/dashboard" && location.pathname === "/");
                return (
                  <Link
                    key={item.name}
                    to={item.link}
                    className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                      isActive
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground hover:bg-secondary/80"
                    }`}
                  >
                    <item.icon className={`w-5 h-5 ${isActive ? "text-primary" : ""}`} />
                    <span>{item.name}</span>
                    {isActive && (
                      <div className="w-1 h-6 bg-primary absolute right-0 rounded-l-md" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="mt-auto p-4 border-t border-border/40">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">
                  {userName.charAt(0).toUpperCase() || "U"}
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">{userName || "Usuário"}</div>
                  <div className="text-xs text-muted-foreground">
                    {userRole === "admin" ? "Administrador" : "Usuário"}
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
            </div>
            <Button variant="outline" size="sm" className="w-full" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" /> Sair
            </Button>
          </div>
        </aside>

        <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-card border-b border-border/40 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-xl text-foreground">
              <DollarSign className="w-6 h-6 text-primary" />
              <span>Finance Flow</span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 p-0 flex flex-col">
                  <div className="p-6 border-b border-border/40">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 font-bold text-xl text-foreground">
                        <DollarSign className="w-6 h-6 text-primary" />
                        <span>Finance Flow</span>
                      </div>
                      <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full">
                          <X className="w-5 h-5" />
                        </Button>
                      </SheetTrigger>
                    </div>
                  </div>
                  <nav className="p-4 space-y-1 flex-grow">
                    {menuItems.map((item) => {
                      const isActive = location.pathname === item.link || (item.link === "/dashboard" && location.pathname === "/");
                      return (
                        <Link
                          key={item.name}
                          to={item.link}
                          className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                            isActive
                              ? "bg-primary/10 text-primary font-medium"
                              : "text-muted-foreground hover:bg-secondary/80"
                          }`}
                        >
                          <item.icon className={`w-5 h-5 ${isActive ? "text-primary" : ""}`} />
                          <span>{item.name}</span>
                        </Link>
                      );
                    })}
                  </nav>
                  <div className="mt-auto p-4 border-t border-border/40">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">
                        {userName.charAt(0).toUpperCase() || "U"}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">{userName || "Usuário"}</div>
                        <div className="text-xs text-muted-foreground">
                          {userRole === "admin" ? "Administrador" : "Usuário"}
                        </div>
                      </div>
                    </div>
                     <Button variant="outline" size="sm" className="w-full" onClick={handleLogout}>
                       <LogOut className="mr-2 h-4 w-4" /> Sair
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

        <main className="flex-1 lg:ml-64">
          <div className="lg:p-0 pt-16">{children}</div>
        </main>
      </div>
    </div>
  );
}

