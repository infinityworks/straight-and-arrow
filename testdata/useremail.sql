DROP DATABASE IF EXISTS sanda;
CREATE DATABASE sanda;

USE sanda;

DROP TABLE IF EXISTS ingredients;

CREATE TABLE ingredients (
  ingredient_id INT NOT NULL, 
  ingredient_name VARCHAR(30) NOT NULL,
  ingredient_price INT NOT NULL,
  PRIMARY KEY (ingredient_id),  
  UNIQUE (ingredient_name)
);

INSERT INTO ingredients
    (ingredient_id, ingredient_name, ingredient_price)
VALUES 
    (1, "Beef", 5),
    (2, "Lettuce", 1),
    (3, "Tomatoes", 2),
    (4, "Taco Shell", 2),
    (5, "Cheese", 3),
    (6, "Milk", 1),
    (7, "Bread", 2);