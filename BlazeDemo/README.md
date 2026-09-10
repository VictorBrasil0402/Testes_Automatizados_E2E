
# ✈️ BlazeDemo – Testes Automatizados (Cypress + Selenium)

## 📖 Sobre o projeto

Este projeto contém testes automatizados end-to-end da aplicação BlazeDemo, uma aplicação simples de compra de passagens aéreas utilizada para prática de automação.

🔗 **A aplicação pode ser acessada em:**
https://www.blazedemo.com


## 📂 Estrutura

```

BlazeDemo/
├── Testes_Cypress/
│   └── cypress/
│       ├── e2e/
│       ├── fixtures/
│       │   ├── User.js    
│       │   └── massaDados.json
│       ├── pages/
│       └── support/
│
├── Testes_Selenium/
│   ├── fixtures/
│   │   ├── User.js
│   │   └── massaDados.json
│   ├── pages/
│   └── test/
│
└── README.md
```


## 🧱 Organização dos Testes

Os testes utilizam o padrão **Page Object Model (POM)** para separar a interação com os elementos da aplicação das regras e validações dos cenários de teste.

A pasta `pages/` concentra os objetos responsáveis pelas páginas e suas respectivas interações, enquanto os arquivos de teste permanecem focados na execução dos cenários e nas validações.


## 🧪 Cenários automatizados

## ✈️ Compra de passagem

* ✅ Seleção de cidade de origem e destino
* ✅ Listagem de voos disponíveis
* ✅ Escolha do voo
* ✅ Preenchimento do formulário de compra
* ✅ Confirmação da compra


## 🔁 Testes Data-Driven (DDT)

* ✔ Execução com múltiplos cenários usando massa de dados (JSON)
* ✔ Variação de origem e destino
* ✔ Geração dinâmica de múltiplos testes (forEach)


## ⚙️ Tecnologias utilizadas

* Node.js
* Cypress
* Selenium WebDriver
* Mocha
* Faker (@faker-js/faker)
* JSON Fixtures (massa de dados)


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