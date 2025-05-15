import Layout from "./Layout.jsx";
import LoginPage from "./LoginPage.jsx";

import Dashboard from "./Dashboard";
import Accounts from "./Accounts";
import Transactions from "./Transactions";
import Forecasts from "./Forecasts";
import Budgets from "./Budgets";
import Calendar from "./Calendar";
import Settings from "./Settings";
import Admin from "./Admin";
import Users from "./Users";
import ImportExport from "./ImportExport";
import CreditCards from "./CreditCards";
import Reports from "./Reports";

import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';

const PAGES = {
    Dashboard: Dashboard,
    Accounts: Accounts,
    Transactions: Transactions,
    Forecasts: Forecasts,
    Budgets: Budgets,
    Calendar: Calendar,
    Settings: Settings,
    Admin: Admin,
    Users: Users,
    ImportExport: ImportExport,
    CreditCards: CreditCards,
    Reports: Reports,
}

function _getCurrentPage(url) {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }

    const pageName = Object.keys(PAGES).find(page => page.toLowerCase() === urlLastPart.toLowerCase());
    return pageName || Object.keys(PAGES)[0];
}

// Componente para verificar autenticação
function RequireAuth({ children }) {
    const userInfo = localStorage.getItem("userInfo");
    const location = useLocation();
    
    if (!userInfo) {
        // Redireciona para login se não estiver autenticado
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    
    return children;
}

// Create a wrapper component that uses useLocation inside the Router context
function PagesContent() {
    const location = useLocation();
    const currentPage = _getCurrentPage(location.pathname);
    
    // Não renderiza o Layout para a página de login
    if (location.pathname === "/login") {
        return (
            <Routes>
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        );
    }
    
    return (
        <Layout currentPageName={currentPage}>
            <Routes>            
                <Route path="/" element={
                    <RequireAuth>
                        <Dashboard />
                    </RequireAuth>
                } />
                
                <Route path="/Dashboard" element={
                    <RequireAuth>
                        <Dashboard />
                    </RequireAuth>
                } />
                
                <Route path="/Accounts" element={
                    <RequireAuth>
                        <Accounts />
                    </RequireAuth>
                } />
                
                <Route path="/Transactions" element={
                    <RequireAuth>
                        <Transactions />
                    </RequireAuth>
                } />
                
                <Route path="/Forecasts" element={
                    <RequireAuth>
                        <Forecasts />
                    </RequireAuth>
                } />
                
                <Route path="/Budgets" element={
                    <RequireAuth>
                        <Budgets />
                    </RequireAuth>
                } />
                
                <Route path="/Calendar" element={
                    <RequireAuth>
                        <Calendar />
                    </RequireAuth>
                } />
                
                <Route path="/Settings" element={
                    <RequireAuth>
                        <Settings />
                    </RequireAuth>
                } />
                
                <Route path="/Admin" element={
                    <RequireAuth>
                        <Admin />
                    </RequireAuth>
                } />
                
                <Route path="/Users" element={
                    <RequireAuth>
                        <Users />
                    </RequireAuth>
                } />
                
                <Route path="/ImportExport" element={
                    <RequireAuth>
                        <ImportExport />
                    </RequireAuth>
                } />
                
                <Route path="/CreditCards" element={
                    <RequireAuth>
                        <CreditCards />
                    </RequireAuth>
                } />
                
                <Route path="/Reports" element={
                    <RequireAuth>
                        <Reports />
                    </RequireAuth>
                } />
                
                {/* Rota de fallback para redirecionar para login */}
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </Layout>
    );
}

export default function Pages() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/*" element={<PagesContent />} />
            </Routes>
        </Router>
    );
}
