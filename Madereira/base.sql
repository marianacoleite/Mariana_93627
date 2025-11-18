CREATE DATABASE madereira;

USE madereira;

CREATE TABLE usuario(
id INT PRIMARY KEY AUTO_INCREMENT,
usuario VARCHAR(12),
senha VARCHAR(4)
);

CREATE TABLE madeira(
id INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(100),
quantidade INT,
valor FLOAT
);



INSERT INTO usuario (usuario,senha)
VALUES ('admin','1234');

SELECT * FROM usuario;