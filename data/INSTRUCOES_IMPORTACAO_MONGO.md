# Instruções para Importação de Dados de Demonstração no MongoDB

Este guia descreve como importar os arquivos JSON de demonstração para suas respectivas coleções no MongoDB usando o `mongoimport`.

## Pré-requisitos

1.  MongoDB instalado e em execução.
2.  As ferramentas de linha de comando do MongoDB (especificamente `mongoimport`) devem estar no PATH do seu sistema ou você deve navegar até o diretório `bin` da sua instalação MongoDB.
3.  Os arquivos JSON de demonstração (`users.json`, `accounts.json`, `categories.json`, `transactions.json`) devem estar no seu sistema local, preferencialmente em um diretório conhecido (ex: `/path/to/your/FinanceFlow-Mongo/data/`).

## Passos para Importação

Abra seu terminal ou prompt de comando e execute os seguintes comandos, substituindo `<sua_uri_do_mongodb>` pela sua string de conexão do MongoDB (ex: `mongodb://localhost:27017`), `<nome_do_banco>` pelo nome do banco de dados que você deseja usar (ex: `financeflow_db`), e `/path/to/your/FinanceFlow-Mongo/data/` pelo caminho real para a pasta `data` do projeto.

**1. Importar Usuários (users.json)**

```bash
mongoimport --uri "<sua_uri_do_mongodb>/<nome_do_banco>" --collection users --type json --file /path/to/your/FinanceFlow-Mongo/data/users.json --jsonArray
```

**2. Importar Contas (accounts.json)**

```bash
mongoimport --uri "<sua_uri_do_mongodb>/<nome_do_banco>" --collection accounts --type json --file /path/to/your/FinanceFlow-Mongo/data/accounts.json --jsonArray
```

**3. Importar Categorias (categories.json)**

```bash
mongoimport --uri "<sua_uri_do_mongodb>/<nome_do_banco>" --collection categories --type json --file /path/to/your/FinanceFlow-Mongo/data/categories.json --jsonArray
```

**4. Importar Transações (transactions.json)**

```bash
mongoimport --uri "<sua_uri_do_mongodb>/<nome_do_banco>" --collection transactions --type json --file /path/to/your/FinanceFlow-Mongo/data/transactions.json --jsonArray
```

### Observações Importantes:

*   **`--jsonArray`**: É crucial usar esta flag porque nossos arquivos JSON contêm um array de documentos.
*   **`<sua_uri_do_mongodb>`**: Se o MongoDB estiver rodando localmente sem autenticação, a URI pode ser simplesmente `mongodb://localhost:27017`.
*   **`<nome_do_banco>`**: Escolha um nome para seu banco de dados. Se ele não existir, o MongoDB o criará automaticamente na primeira importação para ele.
*   **Caminho do arquivo**: Certifique-se de que o caminho para cada arquivo `.json` está correto.
*   **Verificação**: Após a importação, você pode se conectar ao seu banco de dados usando `mongosh` ou uma GUI como MongoDB Compass para verificar se os dados foram importados corretamente.

## Usuários de Demonstração para Login

Após importar os dados, você poderá usar os seguintes usuários para testar o login:

1.  **Usuário Administrador:**
    *   Email: `admin@admin.com`
    *   Senha: `admin`
2.  **Usuário Comum:**
    *   Email: `user@example.com`
    *   Senha: `password123`

Lembre-se de que o backend do projeto FinanceFlow-Mongo precisa estar configurado para se conectar a este mesmo banco de dados MongoDB (verifique o arquivo `src/config/db.js` e as variáveis de ambiente, se aplicável).

