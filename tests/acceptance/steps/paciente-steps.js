/* eslint-disable */
import steps from './steps';

export default function(assert) {
  return steps(assert)
    .when('existem registros com o cpf "$cpf" na base de pacientes', (cpf) => {
      const pacientes = server.db.pacientes;
      const pacientesEncontrados = pacientes.filter(p => p.cpf === cpf).length;
      assert.ok(pacientesEncontrados, `O cpf ${cpf} deve existir na base de dados.`);
    })
}
