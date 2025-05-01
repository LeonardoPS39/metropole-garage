import { createPool } from 'mysql2/promise';
import { VehicleData } from '../shared/types';

interface QueryablePool {
  query<T = any>(sql: string, params?: unknown[]): Promise<[T[], any]>;
  execute<T = any>(sql: string, params?: unknown[]): Promise<[T[], any]>;
}

const rawPool = createPool({
  host: '127.0.0.1',
  user: 'root',        // ajuste conforme seu setup
  password: '',        // ajuste conforme seu setup
  database: 'metropole',
  waitForConnections: true,
  connectionLimit: 10,
});

const pool = rawPool as unknown as QueryablePool;

class VehicleRepository {
  static async getVehiclesBySteam(steamId: string): Promise<VehicleData[]> {
    const [rows] = await pool.execute(
      'SELECT plate, model, color, customization, owner FROM vehicles WHERE owner = ?',
      [steamId]
    );
    return rows as VehicleData[];
  }

  static async getVehicleByPlate(plate: string): Promise<VehicleData | null> {
    const [rows] = await pool.execute(
      'SELECT plate, model, color, customization, owner FROM vehicles WHERE plate = ?',
      [plate]
    );
    const list = rows as VehicleData[];
    return list.length > 0 ? list[0] : null;
  }
}

module.exports = VehicleRepository;