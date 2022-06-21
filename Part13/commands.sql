CREATE TABLE blogs (
	id SERIAL PRIMARY KEY,
	title text NOT NULL,
	author text,
	url text NOT NULL,
	likes integer DEFAULT 0,
);

INSERT INTO blogs (title, author, url) VALUES ('Relational databases', 'FullStackOpen', 'fullstackopen.com');

INSERT INTO blogs (title, url, likes) VALUES ('PostgreSQL is great', 'fullstackopen.com', 14);