DROP DATABASE IF EXISTS arrowdb;
CREATE DATABASE arrowdb;

USE arrowdb;

DROP TABLE IF EXISTS user;

CREATE TABLE user (
  id INT NOT NULL AUTO_INCREMENT, 
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  PRIMARY KEY (id),  
  UNIQUE (id)
);

INSERT INTO user
    ( name, email)
VALUES 
    ( "JJ Beef", "jj@beefdomain.com"),
    ( "Ben Biscuit von Cheese Brunton", "bbvcb@bruntmeister.com"),
    ( "Donald Trump, POTUS", "president@whitehouse.org"),
    ( "R Cake", "admin@cake.com");