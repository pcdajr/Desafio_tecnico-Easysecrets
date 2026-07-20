# Desafio técnico-Easysecrets
# Automação de Testes - Demoblaze

Projeto de automação de testes End-to-End (E2E) desenvolvido com **Playwright** e **TypeScript**, utilizando o padrão **Page Object Model (POM)** para organizar e reutilizar o código dos testes.

O sistema testado é o **Demoblaze**, um protótipo de e-commerce utilizado para estudos e práticas de automação.

---

# Tecnologias Utilizadas

- Node.js
- TypeScript
- Playwright
- Visual Studio Code
- Windows 10

---

# Pré-requisitos

Antes de executar o projeto, instale:

- Node.js (versão LTS)
- Visual Studio Code
- Git (opcional, para clonar o projeto)

Verifique a instalação:

```bash
node -v
npm -v
```

---

# Clonando o projeto

```bash
git clone <URL_DO_REPOSITORIO>
```

Entre na pasta do projeto:

```bash
cd nome-do-projeto
```

Caso tenha baixado o projeto em ZIP, apenas extraia a pasta e abra-a no VS Code.

---

# Abrindo no Visual Studio Code

Abra o VS Code.

Depois selecione:

```
File
→ Open Folder
```

Escolha a pasta do projeto.

Abra o Terminal integrado:

```
Terminal
→ New Terminal
```

---

# Instalando as dependências

Execute:

```bash
npm install
```

---

# Instalando os navegadores do Playwright

Após instalar as dependências, execute:

```bash
npx playwright install
```

Esse comando instala os navegadores utilizados na automação.

---

# Estrutura do Projeto

<img width="555" height="409" alt="image" src="https://github.com/user-attachments/assets/60f4b8fb-fd2a-499f-95a0-58559602a317" />

### Organização

- **tests** → código principal que importa e executa a automação dos teste.
- **pages** → Métodos e regras de negócio (POM).
- **elements** → Seletores (locators) da aplicação.
- **data** → massa de dados dos produtos e inputs dos casos de teste.
- **playwright.config.ts** → Configuração do Playwright.

---

# Executando os testes

Todos os testes:

```bash
npx playwright test
```

Executar um arquivo específico:

```bash
npx playwright test tests/home.spec.ts
```

Executar apenas um teste pelo nome:

```bash
npx playwright test -g "Nome do teste"
```

---

# Executando em modo visual

```bash
npx playwright test --headed
```

---

# Executando em modo Debug

```bash
npx playwright test --debug
```

---

# Abrindo o relatório

Após a execução:

```bash
npx playwright show-report
```

Será aberto o relatório HTML com os resultados da execução.

---

# Arquitetura utilizada

O projeto utiliza o padrão **Page Object Model (POM)** para melhorar a organização e manutenção dos testes.

Cada responsabilidade é separada em uma camada específica:

- **Elements**: contém apenas os locators da página.
- **Pages**: contém as ações realizadas na interface.
- **Tests**: contém os cenários de teste e as validações.

Essa separação reduz duplicação de código, facilita a manutenção e torna os testes mais legíveis.

---

# Site utilizado

https://www.demoblaze.com

---

# Autor

Desenvolvido para fins de estudo e prática em automação de testes com Playwright e TypeScript.




