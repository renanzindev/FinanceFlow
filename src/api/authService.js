// Serviço para autenticação e gerenciamento de usuário
const API_URL = '/api/auth';

// Função para obter o token JWT do localStorage
const getToken = () => {
  return localStorage.getItem('token');
};

// Função para configurar os headers com o token JWT
const getAuthHeaders = () => {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : '',
  };
};

// Login de usuário
export const login = async (email, password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Erro ao fazer login');
  }

  const data = await response.json();
  
  // Salvar o token no localStorage
  localStorage.setItem('token', data.token);
  
  return data;
};

// Obter dados do usuário logado
export const getCurrentUser = async () => {
  const response = await fetch(`${API_URL}/me`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    if (response.status === 401) {
      // Se não autorizado, limpar o token
      localStorage.removeItem('token');
    }
    const errorData = await response.json();
    throw new Error(errorData.message || 'Erro ao obter dados do usuário');
  }

  return await response.json();
};

// Verificar se o usuário está autenticado
export const isAuthenticated = () => {
  return !!getToken();
};

// Logout (remover token)
export const logout = () => {
  localStorage.removeItem('token');
};

// Exportar todas as funções
export default {
  login,
  getCurrentUser,
  isAuthenticated,
  logout,
  getToken,
  getAuthHeaders
};
