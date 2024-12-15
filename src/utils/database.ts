import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { Calculation } from '../types';

const dbPromise = open({
  filename: 'data/cargometrix.db',
  driver: sqlite3.Database
});

export async function initDatabase() {
  const db = await dbPromise;
  
  await db.exec(`
    CREATE TABLE IF NOT EXISTS suppliers (
      supplier_id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE
    )
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS boxes (
      box_id INTEGER PRIMARY KEY AUTOINCREMENT,
      width REAL,
      height REAL,
      depth REAL,
      pieces_per_box INTEGER
    )
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS calculations (
      calc_id INTEGER PRIMARY KEY AUTOINCREMENT,
      supplier_id INTEGER,
      box_id INTEGER,
      calculation_date TEXT,
      total_pieces INTEGER,
      container_type TEXT,
      containers_needed INTEGER,
      space_utilization REAL,
      practical_capacity REAL,
      FOREIGN KEY (supplier_id) REFERENCES suppliers(supplier_id),
      FOREIGN KEY (box_id) REFERENCES boxes(box_id)
    )
  `);
}

export async function saveCalculation(calculation: Calculation) {
  const db = await dbPromise;

  await db.run('BEGIN TRANSACTION');

  try {
    // Insert or get supplier
    const { lastID: supplierId } = await db.run(
      'INSERT OR IGNORE INTO suppliers (name) VALUES (?)',
      [calculation.supplier]
    );

    // Insert box
    const { lastID: boxId } = await db.run(
      'INSERT INTO boxes (width, height, depth, pieces_per_box) VALUES (?, ?, ?, ?)',
      [calculation.box.width, calculation.box.height, calculation.box.depth, calculation.box.piecesPerBox]
    );

    // Insert calculation
    await db.run(
      `INSERT INTO calculations 
       (supplier_id, box_id, calculation_date, total_pieces, container_type, 
        containers_needed, space_utilization, practical_capacity)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        supplierId,
        boxId,
        new Date().toISOString(),
        calculation.totalPieces,
        calculation.containerType,
        calculation.containersNeeded,
        calculation.spaceUtilization,
        calculation.practicalCapacity
      ]
    );

    await db.run('COMMIT');
    return true;
  } catch (error) {
    await db.run('ROLLBACK');
    throw error;
  }
}

export async function getCalculations() {
  const db = await dbPromise;
  
  return db.all(`
    SELECT 
      c.calc_id,
      datetime(c.calculation_date, 'localtime') as calculation_date,
      s.name as supplier_name,
      b.width, b.height, b.depth,
      b.pieces_per_box,
      c.total_pieces,
      c.container_type,
      c.containers_needed,
      c.space_utilization,
      c.practical_capacity
    FROM calculations c
    JOIN suppliers s ON c.supplier_id = s.supplier_id
    JOIN boxes b ON c.box_id = b.box_id
    ORDER BY c.calculation_date DESC
  `);
}

export async function deleteCalculation(calcId: number) {
  const db = await dbPromise;
  await db.run('DELETE FROM calculations WHERE calc_id = ?', [calcId]);
}