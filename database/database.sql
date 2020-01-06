CREATE DATABASE IF NOT EXISTS my_movie_se_app;
USE my_movie_se_app;

--
--	Table structure for table 'users'
--

DROP TABLE IF EXISTS users;

CREATE TABLE users (
	id int NOT NULL AUTO_INCREMENT,
	username varchar(40) NOT NULL,
	password varchar(40) NOT NULL, 
	email varchar(40) DEFAULT NULL,
	PRIMARY KEY(id)
);

--
--	Insert data for table 'users'
--

INSERT INTO users (username, password, email) VALUES 
('John', 'test123', 'John@gmail.com'), 
('Mary', 'test456', 'Mary@gmail.com'),
('Susan', 'test789', 'Susan@gmail.com');



