const pool = require("./database");

class TarefaModel {
// GET /tarefas - Listar todas as tarefas
static async listarTodas() {
try {
const result = await pool.query(
"SELECT * FROM tarefas ORDER BY data_criacao DESC",
);

return result.rows;
} catch (error) {
throw new Error(`Erro ao listar tarefas: ${error.message}`);
}
}

// GET /tarefas/:id - Buscar tarefa por ID
 static async buscarPorId(id) {
 try {
 const result = await pool.query("SELECT * FROM tarefas WHERE id = $1", [
 id,
 ]);
 return result.rows[0];
 } catch (error) {
 throw new Error(`Erro ao buscar tarefa: ${error.message}`);
 }
 }

 // POST /tarefas - Criar nova tarefa
 static async criar(titulo) {
 try {
 const result = await pool.query(
 `INSERT INTO tarefas (titulo)
 VALUES ($1)
 RETURNING *`,
 [titulo],
 );
 return result.rows[0];
 } catch (error) {
 throw new Error(`Erro ao criar tarefa: ${error.message}`);
 }
 }

 // PUT /tarefas/:id - Atualizar tarefa completamente
 static async atualizarCompleto(id, tarefa) {
 const { titulo, concluida } = tarefa;
 try {
 const result = await pool.query(
 `UPDATE tarefas
 SET titulo = $1,
 concluida = $2
 WHERE id = $3
 RETURNING *`,
 [titulo, concluida, id],
 );
 return result.rows[0];
 } catch (error) {
 throw new Error(`Erro ao atualizar tarefa: ${error.message}`);
 }
 }

 // PATCH /tarefas/:id - Atualizar tarefa parcialmente

 static async atualizarParcial(id, campos) {
 try {
 const camposPermitidos = ["titulo", "concluida"];
 const updates = [];
 const values = [];
 let paramCount = 1;

 for (const [campo, valor] of Object.entries(campos)) {
 if (camposPermitidos.includes(campo) && valor !== undefined) {
 updates.push(`${campo} = $${paramCount}`);
 values.push(valor);
 paramCount++;
 }
 }

 if (updates.length === 0) {
 throw new Error("Nenhum campo válido para atualizar");
 }

 values.push(id);
 const query = `
 UPDATE tarefas
 SET ${updates.join(", ")}
 WHERE id = $${paramCount}
 RETURNING *
 `;

 const result = await pool.query(query, values);
 return result;
 } catch (error) {
 throw new Error(`Erro ao atualizar parcialmente: ${error.message}`);
 }
 }

 // DELETE /tarefas/:id - Remover tarefa
 static async deletar(id) {
 try {
 const result = await pool.query(
 "DELETE FROM tarefas WHERE id = $1 RETURNING *",
 [id],
 );
 return result.rows[0];
 } catch (error) {
 throw new Error(`Erro ao deletar tarefa: ${error.message}`);
 }
 }
 }

module.exports = TarefaModel;