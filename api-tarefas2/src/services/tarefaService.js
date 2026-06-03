const TarefaRepository = require("../repositories/tarefaRepository");
class TarefaService {
static async listarTarefas(concluida) {
  const filtro =
    concluida === "true"
      ? true
      : concluida === "false"
      ? false
      : undefined;

  return await TarefaRepository.findAll(filtro);
}
static async buscarPorId(id) {
return await TarefaRepository.findById(id);
}
static async criarTarefa(titulo) {
if (!titulo) {
throw { status: 400, message: 'O campo "titulo" ´e obrigat´orio' };
}
return await TarefaRepository.create(titulo);
}
static async atualizarCompleto(id, data) {
if (!data.titulo) {
    throw { status: 400, message: 'O campo "titulo" ´e obrigat´orio' };
}
const tarefa = await TarefaRepository.update(id, data);
if (!tarefa) {
throw { status: 404, message: `Tarefa com ID ${id} n~ao encontrada` };
}
return tarefa;
}
static async atualizarParcial(id, campos) {
const tarefa = await TarefaRepository.updatePartial(id, campos);
if (tarefa === null && Object.keys(campos).length === 0) {
throw { status: 400, message: "Nenhum campo v´alido para atualizar" };
}
if (!tarefa) {
throw { status: 404, message: `Tarefa com ID ${id} n~ao encontrada` };
}
return tarefa;
}
static async deletarTarefa(id) {
const tarefa = await TarefaRepository.delete(id);
if (!tarefa) {
throw { status: 404, message: `Tarefa com ID ${id} n~ao encontrada` };
}
return tarefa;
}
}
module.exports = TarefaService;

