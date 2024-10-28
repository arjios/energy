# Sistema de Monitoramento de Sensores com Padrão Observer

Este projeto implementa um sistema de monitoramento de dados de sensores em tempo real, utilizando o padrão Observer. O backend usa Express e SQLite, enquanto o frontend é construído com React Native.

## Configuração do Backend

### 1. Inicializar o Projeto

```sh
npm init -y

```
### 2. Instalar as Dependencias

npm install express sqlite3 cors
npm install --save-dev typescript ts-node @types/node @types/express
npm install sqlite

### 3. Configurar o arquivo TypeScript criando o arquivo tsconfig.json

{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}

### 4. Instalar axios para integração com o React Native

npm install axios
