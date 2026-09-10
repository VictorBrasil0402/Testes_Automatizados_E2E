
# 🧪 SauceDemo – Testes Automatizados (Cypress + Selenium)

## 📖 Sobre o projeto

Este projeto contém testes automatizados end-to-end da aplicação SauceDemo, uma loja online utilizada para prática de automação de testes.

🔗 **A aplicação pode ser acessada em:**
https://www.saucedemo.com


## 📂 Estrutura

```

SauceDemo/
├── Testes_Cypress/
│   └── cypress/
│       ├── e2e/
│       ├── fixtures/
│       │   └── User.js
│       ├── pages/
│       └── support/
│
├── Testes_Selenium/
│    ├── fixtures/
│    │   └── User.js
│    ├── pages/
│    └── test/
│
└── README.md
```


## 🧱 Organização dos Testes

Os testes utilizam o padrão **Page Object Model (POM)** para separar a interação com os elementos da aplicação das regras e validações dos cenários de teste.

A pasta `pages/` concentra os objetos responsáveis pelas páginas e suas respectivas interações, enquanto os arquivos de teste permanecem focados na execução dos cenários e nas validações.


## 🧪 Cenários automatizados

## 🔐 Login

* ✅ Login com credenciais válidas
* ❌ Login com credenciais inválidas


## 🛒 Compra de produto

* ✅ Seleção de produto
* ✅ Adição ao carrinho
* ✅ Preenchimento de dados com Faker
* ✅ Validação de valores:
    * subtotal
    * taxa
    * total final


## ⚙️ Tecnologias utilizadas

* Node.js
* Cypress
* Selenium WebDriver
* Mocha
* Faker (@faker-js/faker)


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

