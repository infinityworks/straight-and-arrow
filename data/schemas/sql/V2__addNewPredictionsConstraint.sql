USE arrowdb;
ALTER TABLE prediction
ADD CONSTRAINT UNIQUE (player, tournament, archer);
