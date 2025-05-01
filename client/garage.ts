import { VehicleData } from "../shared/types";

// Register Commands
RegisterCommand("garage", () => {
  emitNet("garage:requestVehicles");
}, false);

RegisterCommand("fechar", () => {
  SetNuiFocus(false, false);
  SendNUIMessage({ type: "hide" });
}, false);


//Register NUI Callbacks
RegisterNuiCallbackType("spawnVehicle");
on("__cfx_nui:spawnVehicle", async (data: { plate: string }) => {
  emitNet("garage:spawnFromUI", data.plate);
  SetNuiFocus(false, false);
  SendNUIMessage({ type: "hide" });
});

RegisterNuiCallbackType("closeNUI");
on("__cfx_nui:closeNUI", async () => {
  SetNuiFocus(false, false);
  SendNUIMessage({ type: "hide" });
});


// Register Events
onNet("garage:receiveVehicles", (vehicles: VehicleData[]) => {
  SendNUIMessage({
    type: "vehicleList",
    vehicles,
  });

  SendNUIMessage({ type: "show" });
  SetNuiFocus(true, true);
});

onNet("garage:spawnVehicleWithData", async (vehicle: VehicleData) => {
  console.log(`[GarageClient] Spawnando veículo: ${vehicle.model} (${vehicle.plate})`);

  const model = vehicle.model;
  const vehicleHash = GetHashKey(model);

  RequestModel(vehicleHash);
  while (!HasModelLoaded(vehicleHash)) {
    await new Promise(res => setTimeout(res, 100));
  }

  const playerPed = PlayerPedId();
  const coords = GetEntityCoords(playerPed, true);

  const veh = CreateVehicle(vehicleHash, coords[0], coords[1], coords[2], GetEntityHeading(playerPed), true, false);
  SetVehicleNumberPlateText(veh, vehicle.plate);

  SetPedIntoVehicle(playerPed, veh, -1);

  try {
    const customization = JSON.parse(vehicle.customization);
    console.log("[GarageClient] Customização do veículo:", customization);
    applyVehicleCustomizations(veh, customization);
  } catch (err) {
    console.warn("[GarageClient] Erro ao aplicar customização:", err);
  }

  Entity(veh).state.set("customData", vehicle.customization, true);
  console.log("[GarageClient] Veículo spawnado com sucesso!");
});


// Functions
function applyVehicleCustomizations(vehicle: number, data: any) {
  SetVehicleModKit(vehicle, 0);

  if (Array.isArray(data.rgbPrimary)) {
    const [r, g, b] = data.rgbPrimary;
    SetVehicleCustomPrimaryColour(vehicle, r, g, b);
  }

  if (Array.isArray(data.rgbSecondary)) {
    const [r, g, b] = data.rgbSecondary;
    SetVehicleCustomSecondaryColour(vehicle, r, g, b);
  }

  if (typeof data.modEngine === "number") {
    SetVehicleMod(vehicle, 11, data.modEngine, false);
  }

  const [r1, g1, b1] = GetVehicleCustomPrimaryColour(vehicle);
  console.log("🔵 Cor primária:", r1, g1, b1);
}