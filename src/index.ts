#!/usr/bin/env node
import { Command } from 'commander';
import { execSync } from 'child_process';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';

const program = new Command();

program
  .name('nextcleanarch')
  .version('1.1.0')
  .description('Gerador de Next.js com camadas de Clean Architecture');

program
  .command('create')
  .description('Cria um novo projeto estruturado')
  .argument('<projectName>', 'Nome da pasta do projeto')
  .action(async (projectName: string) => {
    const projectPath = path.join(process.cwd(), projectName);

    if (fs.existsSync(projectPath)) {
      console.error(chalk.red(`\n❌ Erro: A pasta '${projectName}' já existe.\n`));
      process.exit(1);
    }

    console.log(chalk.blue.bold(`\n🚀 Iniciando Blueprint: ${projectName}\n`));

    try {
      // 1. Setup do Next.js
      console.log(chalk.yellow('📦 Passo 1: Instalando Next.js oficial...'));
      execSync(
        `npx --yes create-next-app@latest ${projectName} --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-git`,
        { stdio: 'inherit' }
      );

      const spinner = ora('Injetando camadas e documentação...').start();

      // 2. Camadas da Arquitetura
      const layers = [
        'services', 'mappers', 'types', 'config', 'constants', 'hooks', 'components/modules'
      ];
      layers.forEach(layer => fs.ensureDirSync(path.join(projectPath, 'src', layer)));

      // 3. README Interno do Projeto
      const readmeTemplate = `
# 🏗️ ${projectName} | Clean Architecture
Gerado via **nextcleanarch**.

## 🏛️ Camadas
- **services**: Requisições e DTOs.
- **mappers**: DTO -> ViewModel.
- **types**: Interfaces estáveis.
- **config**: Validação de ENVs (Zod).
`.trim();

      fs.writeFileSync(path.join(projectPath, 'README.md'), readmeTemplate);

      // 4. Configuração de Variáveis de Ambiente
      const envTemplate = `import { z } from 'zod';
const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url(),
});
export const env = envSchema.parse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
});`;

      fs.writeFileSync(path.join(projectPath, 'src/config/env.ts'), envTemplate);

      spinner.succeed(chalk.green('Arquitetura aplicada com sucesso!'));

      console.log(chalk.cyan.bold(`\n✅ Sucesso! Projeto '${projectName}' está pronto.`));
      console.log(chalk.white(`\nComandos recomendados:\n  cd ${projectName}\n  npm install zod\n  npm run dev\n`));

    } catch (error) {
      console.error(chalk.red('\n❌ Ocorreu um erro durante a execução.'));
      process.exit(1);
    }
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}