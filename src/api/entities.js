// Serviço para interagir com as entidades do backend
import authService from "./authService";

// Função auxiliar para construir a URL da API
const buildApiUrl = (entity, id = null) => {
  const baseUrl = '/api';
  if (id) {
    return `${baseUrl}/${entity}/${id}`;
  }
  return `${baseUrl}/${entity}`;
};

// Função auxiliar para fazer requisições com autenticação
const fetchWithAuth = async (url, options = {}) => {
  const headers = {
    ...options.headers,
    ...authService.getAuthHeaders()
  };

  const response = await fetch(url, {
    ...options,
    headers
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Erro desconhecido' }));
    throw new Error(error.message || `Erro na requisição: ${response.status}`);
  }

  return response.json();
};

// Classe base para as entidades
class BaseEntity {
  static entityName = '';

  static async getAll() {
    return fetchWithAuth(buildApiUrl(this.entityName));
  }

  static async getById(id) {
    return fetchWithAuth(buildApiUrl(this.entityName, id));
  }

  static async filter(filters, sortBy = null, limit = null) {
    // Implementação simplificada para compatibilidade com o código existente
    // No futuro, isso deve ser substituído por uma chamada real à API com filtros
    const data = await this.getAll();
    
    // Filtrar os resultados com base nos filtros fornecidos
    let filtered = data;
    if (filters) {
      filtered = data.filter(item => {
        for (const [key, value] of Object.entries(filters)) {
          if (item[key] !== value) {
            return false;
          }
        }
        return true;
      });
    }
    
    return filtered;
  }

  static async create(data) {
    return fetchWithAuth(buildApiUrl(this.entityName), {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  static async update(id, data) {
    return fetchWithAuth(buildApiUrl(this.entityName, id), {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  static async delete(id) {
    return fetchWithAuth(buildApiUrl(this.entityName, id), {
      method: 'DELETE'
    });
  }
}

// Implementações específicas para cada entidade
class User extends BaseEntity {
  static entityName = 'users';
}

class Account extends BaseEntity {
  static entityName = 'accounts';
}

class Category extends BaseEntity {
  static entityName = 'categories';
}

class Transaction extends BaseEntity {
  static entityName = 'transactions';
}

class Budget extends BaseEntity {
  static entityName = 'budgets';
}

class CreditCardBill extends BaseEntity {
  static entityName = 'credit-card-bills';
}

class GlobalCategory extends BaseEntity {
  static entityName = 'global-categories';
}

class GlobalAccount extends BaseEntity {
  static entityName = 'global-accounts';
}

export {
    User,
    Account,
    Transaction,
    Category,
    Budget,
    CreditCardBill,
    GlobalCategory,
    GlobalAccount
};
