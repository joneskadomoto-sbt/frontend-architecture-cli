# 🏗️ nextcleanarch CLI

**nextcleanarch** é uma interface de linha de comando (CLI) opinativa para desenvolvedores que desejam iniciar projetos Next.js já estruturados com **Clean Architecture** (Arquitetura em Camadas).

Diga adeus à "pasta bagunçada" e comece seus projetos com desacoplamento, tipagem forte e validação de ambiente (Zod) desde o primeiro segundo.

---
## 🚀 Como usar

Você pode rodar a CLI diretamente via `npx` ou instalá-la globalmente.

### Via npx (Recomendado)
```bash
npx nextcleanarch create meu-projeto
```

## Instalação Global

```bash
npm install -g nextcleanarch

# ou 
yarn global add nextcleanarch
```
Depois basta rodar:

```bash
nextcleanarch create meu-projeto
```


## ✨ O que ele faz?
Ao rodar o comando `create`, a CLI executa os seguintes passos:
- **Next.js Setup**: Executa o `create-next-app` oficial com as melhores práticas (TypeScript, Tailwind, App Router, Src Dir).
- **Layer Injection**: Cria automaticamente a estrutura de pastas para Clean Architecture.
- **Zod Config**: Injeta um validador de variáveis de ambiente (`src/config/env.ts`) pronto para uso.
- **Auto-Docs**: Gera um `README.md` interno no novo projeto explicando a arquitetura para o restante do seu time.
---

## 🏛️ A Arquitetura Gerada

O projeto resultante segue o fluxo: **API ➔ Service (DTO) ➔ Mapper ➔ View (ViewModel)**.

| Pasta | Responsabilidade |
| :--- | :--- |
| `src/services` | Camada de infraestrutura. Realiza requisições HTTP e lida com contratos brutos (DTOs). |
| `src/mappers` | Camada de domínio. Transforma dados da API para o modelo que a View espera. |
| `src/types` | Contratos de dados estáveis da UI (ViewModels). |
| `src/components/modules` | Views complexas e componentes de página desacoplados de lógica de API. |
| `src/config` | Validação de variáveis de ambiente com Zod e configurações globais. |
| `src/constants` | Armazenamento de valores estáticos e configurações não sensíveis. |
| `src/hooks` | Lógica de estado e hooks customizados reutilizáveis. |

---

## 🛠️ Requisitos

- **Node.js**: v18.x ou superior.
- **Gerenciador de pacotes**: npm, yarn ou pnpm instalado no sistema.

---

## 🏗️ Desenvolvimento Local

Se você quiser contribuir ou modificar a CLI:

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/nextcleanarch.git
```

2. Instale as dependências:
```bash
npm install
```

3. Compile o projeto:
```bash
npm run build
```

4. Registre localmente para testar:
```bash
npm link
```

---
