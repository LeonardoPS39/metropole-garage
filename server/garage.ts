// @ts-ignore
const { getVehicleByPlate, getVehiclesBySteam } = require(GetResourcePath(GetCurrentResourceName()) + '/server/database.js');

import { VehicleData } from '../shared/types';

class GarageService {
  constructor() {
    console.log('[GarageService] Inicializado');
    this.registerCommands();
    this.registerEvents();
  }

  private registerCommands() {
    RegisterCommand("car", async (source: number, args: string[]) => {
      if (!IsPlayerAceAllowed(String(source), "garage.admin")) {
        emitNet("chat:addMessage", source, { args: ["Sistema", "Você não tem permissão."] });
        return;
      }

      const plate = args[0];
      if (!plate) {
        emitNet("chat:addMessage", source, { args: ["Sistema", "Use: /car <placa>"] });
        return;
      }

      const vehicle = await getVehicleByPlate(plate);
      if (!vehicle) {
        emitNet("chat:addMessage", source, { args: ["Sistema", "Veículo não encontrado."] });
        return;
      }

      emitNet("garage:spawnVehicleWithData", source, vehicle);
    }, false);
  }

  private registerEvents() {
    onNet("garage:requestVehicles", async () => {
      const source = (globalThis as any).source;
  
      const steamId = this.getSteamId(source);
  
      if (!steamId) {
        console.warn(`[GarageService] Steam ID não encontrado para ${source}`);
        return;
      }
  
      const vehicles = await getVehiclesBySteam(steamId);
      emitNet("garage:receiveVehicles", source, vehicles);
    });
  
    onNet("garage:spawnFromUI", async (plate: string) => {
      const source = (globalThis as any).source;
  
      const vehicle = await getVehicleByPlate(plate);
      if (!vehicle) {
        emitNet("chat:addMessage", source, { args: ["Sistema", "Veículo não encontrado."] });
        return;
      }
  
      emitNet("garage:spawnVehicleWithData", source, vehicle);
    });
  }
  

  private getSteamId(source: number): string | null {
    const ids = getPlayerIdentifiers(source);
    for (const id of ids) {
      if (id.startsWith("license:")) return id;
    }
    return null;
  }
}

new GarageService();
