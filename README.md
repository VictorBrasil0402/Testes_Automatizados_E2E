
# 🧪 Testes Automatizados E2E (Cypress + Selenium)

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white&style=flat-square)
![Cypress](https://img.shields.io/badge/Cypress-17202C?logo=cypress&logoColor=white&style=flat-square)
![Selenium](https://img.shields.io/badge/Selenium-43B02A?logo=selenium&logoColor=white&style=flat-square)


## 📖 Sobre o projeto

Este repositório reúne testes automatizados end-to-end desenvolvidos para diferentes aplicações web, utilizando:

* ✅ Cypress
* ✅ Selenium WebDriver


## 🌐 Projetos cobertos

🛒 **XTRacer** → Site e-commerce com fluxos de:

* Cadastro de usuário (PF e PJ)
* Login
* Seleção de produtos

✈️ **BlazeDemo** → Aplicação de testes (agência de viagens) com fluxo de:

* Busca de voos 
* Compra de passagens

🧪 **SauceDemo** → Aplicação de testes (loja de produtos) com:

* Login
* Compra de produto


## 📂 Estrutura do repositório

```
.
├── .github/
│   └── workflows/
│       ├── cypress.yml
│       └── selenium.yml
│
├── BlazeDemo/
│   ├── Testes_Cypress/
│   ├── Testes_Selenium/
│   └── README.md
│
├── SauceDemo/
│   ├── Testes_Cypress/
│   ├── Testes_Selenium/
│   └── README.md
│
├── XTRacer/
│   ├── assets/
│   ├── Testes_Cypress/
│   ├── Testes_Selenium/
│   ├── BUG_REPORT.md
│   └── README.md
│
├── .gitignore
└── README.md
```


## 🧱 Arquitetura dos Testes

Os testes automatizados utilizam o padrão **Page Object Model (POM)** para organizar a interação com as páginas e componentes das aplicações.

A estrutura separa:

* 📄 **Pages** → classes/objetos responsáveis pelas páginas e seus elementos
* 🧩 **Components** → componentes reutilizáveis presentes em diferentes fluxos
* 🧪 **Tests / E2E** → cenários e validações dos testes
* 📦 **Fixtures** → massas de dados utilizadas durante a execução

A implementação do POM é utilizada tanto nos testes com **Cypress** quanto nos testes com **Selenium WebDriver**, respeitando as características de cada framework.


## ⚙️ Configuração do Ambiente

## 📌 Pré-requisitos

- Node.js e Google Chrome instalados

## 🚀 Instalação

🔹 **Inicializar projeto**

```

npm init -y
```

🔹 **Instalar Cypress**

```

npm install cypress --save-dev
```

🔹 **Instalar Selenium + Mocha**

```

npm install selenium-webdriver mocha
```

## 🧪 Execução dos Testes

🔹 **Cypress**

➡️ **Configurar o Script de Teste**

package.json

```

"scripts": {
  "test": "cypress run",
  "cypress:open": "cypress open"
}
```

⚡ **Executar em modo headless (terminal)**

```

npx cypress run
```

▶️ **Abrir interface gráfica (Test Runner)**

```

npx cypress open
```

📦 **Estrutura gerada automaticamente**

```

cypress/
  e2e/
  fixtures/
  support/
cypress.config.js
```

🔹 **Selenium (Mocha)**

▶️ **Executar testes**

```
npx mocha
```


## ⚙️ Integração Contínua

O repositório utiliza **GitHub Actions** para automatizar a execução dos testes end-to-end dos diferentes projetos e frameworks.

Os workflows estão organizados da seguinte forma:

```text
.github/
└── workflows/
    ├── cypress.yml
    └── selenium.yml
```

### 🔄 Cypress

O workflow `cypress.yml` executa automaticamente os testes **Cypress** dos projetos configurados no pipeline, utilizando execução em modo *headless*.

### 🔄 Selenium

O workflow `selenium.yml` executa automaticamente os testes **Selenium WebDriver** dos projetos configurados no pipeline, também em modo *headless*.

### 🔐 Variáveis de ambiente

Informações utilizadas pelos testes que não devem ser armazenadas diretamente no código são disponibilizadas por meio de **GitHub Secrets**.

Entre os dados utilizados estão:

* credenciais de acesso;
* dados necessários aos fluxos de teste;
* outros valores sensíveis utilizados durante a execução.