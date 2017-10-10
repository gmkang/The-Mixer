DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS savedRecipes CASCADE;


CREATE TABLE users (
	id BIGSERIAL PRIMARY KEY,
	email VARCHAR NOT NULL UNIQUE,
	password_digest VARCHAR NOT NULL,
	thread_id VARCHAR NOT NULL
);

CREATE TABLE savedRecipes (
	id BIGSERIAL PRIMARY KEY,
	name VARCHAR,
	measurements VARCHAR, /*[1]*/
	ingredients VARCHAR,/*[1]*/
	instructions TEXT,
	image TEXT,
	beverageType VARCHAR,
	complete BOOLEAN DEFAULT FALSE,
	user_id BIGINT REFERENCES users(id)
);

INSERT INTO savedRecipes (name, measurements, ingredients, instructions, image, beverageType) VALUES 
('Cucumber Mojito', '{4oz, 2oz, 2 sprigs}', '{Club soda, Sprite, mint & cucumber}', 'Muddle mint and cucumber then add ice and pour sprite and club soda', 'https://cookswithcocktails.com/wp-content/uploads/2014/09/Mojito-3.jpg', 'Non-alcoholic');
