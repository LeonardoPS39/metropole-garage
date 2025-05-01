import { useEffect, useState } from "react";
import { VehicleData } from "./types";
import styles from "./App.module.css";

declare function GetParentResourceName(): string;

function App() {
  const [vehicles, setVehicles] = useState<VehicleData[]>([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    window.addEventListener("message", (event) => {
      const { type, vehicles } = event.data;

      if (type === "vehicleList") {
        setVehicles(vehicles);
      }

      if (type === "show") {
        setVisible(true);
      }

      if (type === "hide") {
        setVisible(false);
      }
    });
  }, []);

  const spawnVehicle = (plate: string) => {
    fetch(`https://${GetParentResourceName()}/spawnVehicle`, {
      method: "POST",
      body: JSON.stringify({ plate }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const closeNUI = () => {
    fetch(`https://${GetParentResourceName()}/closeNUI`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  if (!visible) return null;

  return (
    <div style={{ display: visible ? 'block' : 'none' }}>
      <div className={styles.container}>
        <button onClick={closeNUI}>Fechar</button>
        <h1 className={styles.title}>Seus Veículos</h1>
        {vehicles.length === 0 ? (
          <div>Nenhum veículo encontrado.</div>
        ) : (
          vehicles.map((veh) => (
            <div key={veh.plate} className={styles.vehicleCard}>
              <div>
                <div><strong>{veh.model}</strong></div>
                <div>Placa: {veh.plate}</div>
                <div>Cor: {veh.color}</div>
              </div>
              <button onClick={() => spawnVehicle(veh.plate)} className={styles.button}>
                Spawnar
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
