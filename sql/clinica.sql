create database sistema_clinica;
use sistema_clinica;

create table animais (
    id int auto_increment primary key,
    nome varchar(100) not null,
    especie varchar(50) not null,
    raca varchar(50) not null,
    idade int not null,
    nome_tutor varchar(100) not null
);

insert into animais (nome, especie, raca, idade, nome_tutor) values
('Rex', 'Cachorro', 'Labrador', 5, 'Carlos Silva'),
('Mimi', 'Gato', 'Siamês', 3, 'Ana Souza'),
('Thor', 'Cachorro', 'Bulldog', 7, 'Marcos Lima'),
('Luna', 'Gato', 'Persa', 2, 'Julia Alves'),
('Bob', 'Cachorro', 'Poodle', 4, 'Pedro Rocha');

select * from animais;