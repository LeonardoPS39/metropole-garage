# Metropole Garage

Sistema de garagem para FiveM feito com TypeScript, React e banco de dados MySQL.

---

## 📦 Funcionalidades

- Comando `/garage` abre uma interface React com todos os veículos do jogador.
- Cada veículo exibe **modelo**, **placa**, **cor** e um botão de **"Spawnar"**.
- Comando `/car <placa>` (admin) permite spawnar qualquer veículo salvo.
- Customizações como **motor (engine)** e **cores RGB primária/segundária** são aplicadas automaticamente ao spawn.
- NUI pode ser fechada com `/fechar` ou por botão (opcional).
- Banco de dados MySQL armazena os veículos com campos como: modelo, placa, cor, customizações e dono.

---

## 🛠 Tecnologias

- ✅ **TypeScript** em todas as camadas
- ✅ **React + Vite** para NUI
- ✅ **esbuild** para build leve do recurso
- ✅ **MySQL** com `mysql2` para persistência
- ✅ **StateBag** para armazenamento de dados no veículo
- ✅ Sem uso de ESX, QBCore, vRP ou frameworks externos

---

## 🎮 Comandos

| Comando        | Descrição                                      |
|----------------|-----------------------------------------------|
| `/garage`      | Abre a interface de garagem                   |
| `/fechar`      | Fecha a interface e libera o mouse            |
| `/car <placa>` | (admin) Spawnar veículo diretamente pela placa |

---

## 🧪 Testando

1. Dê `ensure metropole-garage` no seu servidor
2. Certifique-se de que o banco `metropole` e a tabela `vehicles` existem
3. Insira veículos de teste com seu license ID
4. Use `/garage` no jogo para abrir a NUI

---

## 📂 Build do projeto

### 🔧 Build do recurso
```npm install```
```npm run build```

### 🔧 Build da NUI (nui/)
```cd nui``` 
```npm install```
```npm run build```

---

## 📄 Banco de Dados

Veja o arquivo [`setup.sql`](./setup.sql) com a estrutura da tabela e exemplos prontos para testes.

---

## 🎥 Demonstração

[`Vídeo demonstrativo.`](https://youtu.be/5fn3G0QKdbE)

---

## ✅ Observações

- A criação de veículos no client foi mantida para maior estabilidade e controle da aplicação das customizações, após tentativa de integração completa via servidor.
