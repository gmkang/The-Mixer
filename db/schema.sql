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
	measurements VARCHAR,
	ingredients VARCHAR,
	instructions TEXT,
	image TEXT,
	beverageType VARCHAR,
	user_id BIGINT REFERENCES users(id)
);