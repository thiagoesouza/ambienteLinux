const express = require("express");
 const cors = require("cors");
 const pool = require("./database");
 const tarefaModel = require("./tarefasModel");

 const app = express();

 // Middlewares essenciais
 app.use(cors());
 app.use(express.json());

 // Log simples das requisições
 app.use((req, res, next) => {
 console.log(`${req.method} ${req.url}`);
 next();
 });

 // Rota de teste
 app.get("/", (req, res) => {
 res.json({ mensagem: "API de Tarefas funcionando!" });
 });

 // GET /tarefas - Listar todas as tarefas
 app.get("/tarefas", async (req, res) => {
 try {
 const result = await tarefaModel.listarTodas();
 res.json({
 tarefas: result,
 });
 } catch (error) {
 console.error("Erro ao listar tarefas:", error);
 res.status(500).json({ erro: "Erro ao listar tarefas" });
 }
 });

 // GET /tarefas/:id - Buscar tarefa por ID
 app.get("/tarefas/:id", async (req, res) => {
 try {
 const id = parseInt(req.params.id);
 if (isNaN(id)) {
 return res.status(400).json({
 erro: "ID deve ser um número válido",
 });
 }
 const result = await tarefaModel.buscarPorId(id);

 if (result === undefined) {
 return res.status(404).json({
 erro: `Tarefa com ID ${id} não encontrada`,
 });
 }
 res.json(result);
 } catch (error) {
 console.error("Erro ao buscar tarefa:", error);
 res.status(500).json({ erro: "Erro ao buscar tarefa" });
 }
 });

 // POST /tarefas - Criar nova tarefa
 app.post("/tarefas", async (req, res) => {
 try {
 const { titulo } = req.body;
 if (!titulo) {
 return res.status(400).json({
 erro: 'O campo "titulo" é obrigatório',
 });
 }
 const result = await tarefaModel.criar(titulo);
 res.status(201).json({
 mensagem: "Tarefa criada com sucesso!",
 tarefa: result,
 });
 } catch (error) {
 console.error("Erro ao criar tarefa:", error);
 res.status(500).json({ erro: "Erro ao criar tarefa" });
 }
 });

 // PUT /tarefas/:id - Atualizar tarefa completamente
 app.put("/tarefas/:id", async (req, res) => {
 try {
 const id = parseInt(req.params.id);
 if (isNaN(id)) {
 return res.status(400).json({
 erro: "ID deve ser um número válido",
 });
 }
 const { titulo } = req.body;
 if (!titulo) {
 return res.status(400).json({
 erro: 'O campo "titulo" é obrigatório',
 });
 }
 const result = await tarefaModel.atualizarCompleto(id, req.body);
 if (result === undefined) {
 return res.status(404).json({
 erro: `Tarefa com ID ${id} não encontrada`,
 });

 }
 res.json({
 mensagem: "Tarefa atualizada completamente!",
 tarefa: result,
 });
 } catch (error) {
 console.error("Erro ao atualizar tarefa:", error);
 res.status(500).json({ erro: "Erro ao atualizar tarefa" });
 }
 });

 // PATCH /tarefas/:id - Atualizar tarefa parcialmente
 app.patch("/tarefas/:id", async (req, res) => {
 try {
 const id = parseInt(req.params.id);
 if (isNaN(id)) {
 return res.status(400).json({
 erro: "ID deve ser um número válido",
 });
 }
 const result = await tarefaModel.atualizarParcial(id, req.body);
 res.json({
 mensagem: "Tarefa atualizada parcialmente!",
 tarefa: result.rows[0],
 });
 } catch (error) {
 console.error("Erro ao atualizar parcialmente:", error);
 res.status(500).json({ erro: "Erro ao atualizar tarefa" });
 }
 });

 // DELETE /tarefas/:id - Remover tarefa
 app.delete("/tarefas/:id", async (req, res) => {
 try {
 const id = parseInt(req.params.id);
 if (isNaN(id)) {
 return res.status(400).json({
 erro: "ID deve ser um número válido",
 });
 }
 const result = await tarefaModel.deletar(id);
 if (result === undefined) {
 return res.status(404).json({
 erro: `Tarefa com ID ${id} não encontrada`,
 });
 }
 res.json({
 mensagem: "Tarefa removida com sucesso!",
 tarefa: result,
 });
 } catch (error) {
 console.error("Erro ao deletar tarefa:", error);

 res.status(500).json({ erro: "Erro ao deletar tarefa" });
 }
 });

 // Rota não encontrada
 app.use((req, res) => {
 res.status(404).json({
 erro: `Rota ${req.method} ${req.originalUrl} não encontrada`,
 });
 });

 // Erro interno do servidor
 app.use((err, req, res, next) => {
 console.error(err.stack);
 res.status(500).json({
 erro: "Erro interno do servidor",
 });
 });

 const PORT = process.env.PORT || 3000;

 app.listen(PORT, () => {
 console.log(`Servidor rodando em http://localhost:${PORT}`);
 });
