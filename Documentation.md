
# 📚 Documentação Técnica — Metropole Garage

Sistema de garagem para FiveM implementado com TypeScript, React (NUI) e MySQL.

---

## 🧱 Arquitetura

O recurso segue uma arquitetura separada em três camadas:

- **Client (TS)**: lógica do jogador, NUI e controle do veículo
- **Server (TS)**: comandos, integração com banco e lógica de spawn
- **Shared (TS)**: tipos e contratos reutilizáveis entre client/server

A interface NUI é separada e implementada em React + Vite (com CSS Modules).

---

## 🗂 Estrutura de Arquivos

```
metropole-garage/
├── client/
│   └── garage.ts         # lógica de spawn, comandos, NUI
├── server/
│   └── garage.ts         # eventos, comandos, spawn server-side
│   └── database.ts       # conexão com MySQL e repository
├── shared/
│   └── types.ts          # tipos globais (ex: VehicleData)
├── nui/
│   ├── src/              # código-fonte React
│   ├── dist/             # build final da interface
│   └── index.html
├── fxmanifest.lua
├── setup.sql             # script de criação e dados de teste do banco
├── README.md             # instruções gerais e uso
└── Documentation.md   # documentação técnica (este arquivo)
```

---

## 🔄 Fluxo de Dados

1. Jogador executa `/garage`
2. Client envia `garage:requestVehicles` ao servidor
3. Server consulta o banco pelo `license:` e retorna os veículos
4. Client renderiza a interface React com os dados recebidos
5. Jogador clica em "Spawnar" → envia `spawnVehicle` via NUI → client emite `garage:spawnFromUI`
6. Server busca os dados no banco → envia pro client **criar o veículo**
7. Client armazena `customData` no `StateBag` da entidade, entra no veículo e aplica a customização

---

## 📄 Banco de Dados

A tabela `vehicles` possui os seguintes campos:

| Campo         | Tipo        | Descrição                             |
|---------------|-------------|----------------------------------------|
| id            | INT         | Chave primária                        |
| plate         | VARCHAR(10) | Placa do veículo                      |
| model         | VARCHAR(50) | Nome do modelo do veículo             |
| color         | VARCHAR(20) | Cor descritiva (visual)               |
| customization | TEXT        | JSON com mods e cores                 |
| owner         | VARCHAR(50) | Identificador do dono (steam/license) |

Exemplo de `customization`:

```json
{
  "modEngine": 3,
  "rgbPrimary": [128, 0, 128],
  "rgbSecondary": [60, 60, 60]
}
```

---

## 🎨 Customizações Aplicadas

As customizações são aplicadas usando natives no client:

- `SetVehicleModKit`
- `SetVehicleMod (engine)`
- `SetVehicleCustomPrimaryColour`
- `SetVehicleCustomSecondaryColour`

---

## 💾 Uso de StateBag

- O client define `Entity(veh).state.set('customData', ..., true)` ao spawnar o veículo
- O valor é replicado e persistido enquanto o veículo existir

---

## 🔐 Permissões ACE

Para utilizar o comando `/car <placa>` como admin:

```cfg
add_ace identifier.license:XXXXXX garage.admin allow
```

---

## 🔧 Build

### Build do recurso (client/server):
```
npm run build
```

### Build da NUI:
```
cd nui
npm run build
```

---

## 🧪 Testes Recomendados

- Testar spawn de múltiplos veículos
- Usar diferentes combinações de `rgbPrimary`, `modEngine`

---

## 👨‍💻 Desenvolvido por

**Leonardo Peixoto**  
Desafio técnico — Vaga de Desenvolvedor TypeScript para FiveM
