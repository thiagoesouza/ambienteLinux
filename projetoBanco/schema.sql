-- Criar banco de dados
CREATE DATABASE tarefas_db;

-- Conectar ao banco
\c tarefas_db;

 -- Criar tabela de tarefas (estrutura compatível com seu código)
 CREATE TABLE IF NOT EXISTS tarefas (
id SERIAL PRIMARY KEY,
titulo VARCHAR(255) NOT NULL,
concluida BOOLEAN DEFAULT false,
data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

 -- Inserir dados iniciais (mesmos do seu código original)
 INSERT INTO tarefas (titulo, concluida) VALUES
 ('Estudar Express', false),
 ('Fazer exercícios', true),
 ('Revisar middlewares', false);