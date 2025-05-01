CREATE DATABASE IF NOT EXISTS metropole;
USE metropole;

CREATE TABLE IF NOT EXISTS vehicles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  plate VARCHAR(10) NOT NULL UNIQUE,
  model VARCHAR(50) NOT NULL,
  color VARCHAR(20),
  customization TEXT,
  owner VARCHAR(50) NOT NULL
);

-- Exemplo: Sultan azul com motor 2
INSERT INTO vehicles (plate, model, color, customization, owner) VALUES
(
  'SULTAN1',
  'sultan',
  'azul',
  '{"modEngine":2,"rgbPrimary":[0,102,204],"rgbSecondary":[0,0,0]}',
  'license:2f5b1f0e950a4207d3981000e0225d5f2afe7049'
);

-- Exemplo: Adder roxo com motor 3
INSERT INTO vehicles (plate, model, color, customization, owner) VALUES
(
  'ADDER1',
  'adder',
  'roxo',
  '{"modEngine":3,"rgbPrimary":[128,0,128],"rgbSecondary":[60,60,60]}',
  'license:2f5b1f0e950a4207d3981000e0225d5f2afe7049'
);

