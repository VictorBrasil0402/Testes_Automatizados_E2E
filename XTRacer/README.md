
# 🛒 XTRacer – Testes Automatizados E2E (Cypress + Selenium)

## 📖 Sobre o projeto

Este projeto contém testes automatizados end-to-end da aplicação XTRacer, um e-commerce real, com foco na validação dos principais fluxos funcionais de compra (cadastro, login, navegação, carrinho e checkout).

🔗 **A aplicação pode ser acessada em:**
https://www.xtracer.com.br


## 📂 Estrutura

```

XTRacer/
├── assets/
├── Testes_Cypress/
│   └── cypress/
│       ├── components/
│       │   ├── CadastroPFComponent.js
│       │   └── CadastroPJComponent.js   
│       ├── e2e/
│       ├── fixtures/
│       │   ├── UsuarioPF.js
│       │   └── UsuarioPJ.js
│       ├── pages/    
│       └── support/
│
├── Testes_Selenium/
│   ├── components/
│   │   ├── CadastroPFComponent.js
│   │   └── CadastroPJComponent.js
│   ├── fixtures/
│   │   ├── UsuarioPF.js
│   │   └── UsuarioPJ.js
│   ├── pages/
│   └── test/
│   
├── BUG_REPORT.md
└── README.md
```


## 🧱 Organização dos Testes

Os testes utilizam o padrão **Page Object Model (POM)** para separar a interação com a aplicação das regras e validações dos cenários.

A estrutura é organizada em:

* 📄 **Pages** → páginas e fluxos principais da aplicação
* 🧩 **Components** → componentes reutilizáveis, como os formulários de cadastro de Pessoa Física e Pessoa Jurídica
* 🧪 **Test** → cenários automatizados e suas validações
* 📦 **Fixtures** → dados utilizados durante os testes

Essa organização é utilizada tanto na implementação com **Cypress** quanto com **Selenium WebDriver**, respeitando as particularidades de cada ferramenta.


## 🧪 Cenários automatizados

## 👤 Cadastro de usuários (Pessoa Física e Pessoa Jurídica)

* ✅ Cadastro com dados válidos
* ❌ Cadastro com dados inválidos 

🔎 **Estratégias de validação:**

* Validação por mudança de título da página
* Exibição de mensagens de erro ao usuário
* Permanência na mesma página após tentativa de ação inválida
* Validação alternativa quando mensagens não são exibidas


## 🔐 Login

* ✅ Login com credenciais válidas
* ❌ Login com dados inválidos

🔎 **Estratégias de validação:**

* Mudança de URL após autenticação
* Permanência na etapa atual em caso de erro
* Não exibição de campos subsequentes (ex: senha)
* Validação por mensagem de erro quando disponível
* Fallback baseado em comportamento da interface


## 🛒 Seleção de produtos

* ✅ Navegação por categorias e filtros
* ✅ Adição de produtos ao carrinho

## 🚚 Cálculo de frete (CEP)

* ✅ Fluxo com CEP válido
* ❌ Fluxo com CEP inválido

🔎 **Estratégias de validação:**

* Avanço (ou não) para a próxima etapa do checkout
* Exibição de campos condicionais (ex: confirmação de e-mail)

## 🚫 Produto indisponível

❌ Validação de produto sem estoque

🔎 **Estratégias de validação:**

* Verificação de conteúdo presente no DOM e visibilidade
* Validação de estado do botão de compra (indisponível)

## 💳 Checkout

* ✅ Preenchimento de dados
* ✅ Validação de etapa intermediária (identificação)
* ⚠️ Limitações devido a validações externas (ex: segurança/captcha), que restringem a automação completa do fluxo


## ⚙️ Tecnologias utilizadas

* Node.js
* Cypress
* Selenium WebDriver
* Mocha
* Gerador-BR (dados fictícios brasileiros)


## 🚀 Como executar

🔹 **Cypress**

```

cd Testes_Cypress
npm install
npx cypress open
```

**ou modo headless:**

```

npx cypress run
```

🔹 **Selenium**

```

cd Testes_Selenium
npm install
npx mocha
```


## 💡 Estratégias aplicadas

* ✔ Prioridade para validações reativas (estado da aplicação)
* ✔ Validação baseada em comportamento (não apenas mensagens)
* ✔ Uso de cy.session() para reutilização de sessão (Cypress)
* ✔ Uso de variáveis de ambiente para dados sensíveis
* ✔ Testes negativos baseados em comportamento esperado do sistema


## ⚠️ Desafios encontrados

* Elementos dinâmicos sem identificadores únicos
* Fluxos com múltiplas etapas intermediárias
* Elementos presentes no DOM, mas não visíveis
* Ausência ou inconsistência de mensagens de erro
* Mudanças de URL nem sempre confiáveis como critério de validação
* Dependência de parâmetros dinâmicos na navegação (?loja=...)


## 🧠 Aprendizados

* Diferenças práticas entre Cypress e Selenium (modelo de execução, estratégias de espera e controle do navegador)
* Estratégias para reduzir testes instáveis (flaky tests)
* Importância de validar comportamento da aplicação, não apenas UI
* Uso de sessões para otimização de execução
* Boas práticas na seleção de elementos (evitando seletores frágeis)