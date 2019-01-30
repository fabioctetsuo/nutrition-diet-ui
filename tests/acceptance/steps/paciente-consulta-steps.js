/* eslint-disable */
import { click } from '@ember/test-helpers';
import { Response } from 'ember-cli-mirage';
import steps from './paciente-steps';
import env from '../../../config/environment';

const { avaliacaoNutricionalApi } = env;
const url = `${avaliacaoNutricionalApi.host}/${avaliacaoNutricionalApi.namespace}/${avaliacaoNutricionalApi.version}`;

export default function(assert) {
  return steps(assert)
    .when('existem registros com o nome "$nome" na base de pacientes', (nome) => {
      const pacientes = server.db.pacientes;
      const pacientesEncontrados = pacientes.filter(p => {
        const nomeCompleto = `${p.primeiroNome} ${p.sobrenome}`;
        return nomeCompleto.includes(nome);
      }).length;
      assert.ok(pacientesEncontrados, `O nome ${nome} deve existir na base de dados.`);
    })

    .when('não existem registros com o nome "$nome" na base de pacientes', (nome) => {
      const pacientes = server.db.pacientes;
      const pacientesEncontrados = pacientes.filter(p => {
        const nomeCompleto = `${p.primeiroNome} ${p.sobrenome}`;
        return nomeCompleto.includes(nome);
      }).length;
      assert.notOk(pacientesEncontrados, `O nome ${nome} não deve existir na base de dados.`);
    })

    .when('não existem registros com o cpf "$cpf" na base de pacientes', (cpf) => {
      const pacientes = server.db.pacientes;
      const pacientesEncontrados = pacientes.filter(p => p.cpf === cpf).length;
      assert.notOk(pacientesEncontrados, `O cpf ${cpf} não deve existir na base de dados.`);
    })

    .when('clicar no botão "$button" e o serviço estiver indisponível', async (button) => {
      server.get(`${url}/pacientes`, () => new Response(500, {}, {
        errors: [
          { message: 'Serviço indisponível no momento, favor consulte novamente mais tarde.' },
        ],
      }));
      await click(`#btn-${button}`);
      assert.ok(true, `Botão ${button} foi clicado`);
    })

    .then('devo ver uma tabela com o registro dos pacientes com o nome "$nome"', (nome) => {
      const renderedPacientes = $('#tbl-pacientes tbody tr').map((i,e) => ({
        cpf: $(e).find(`#paciente-${i}-cpf`).text().trim().replace(/[^Z0-9 ]/g, ''),
        nome: $(e).find(`#paciente-${i}-nomeCompleto`).text().trim(),
        dataNascimento: $(e).find(`#paciente-${i}-dataNascimento`).text().trim(),
        altura: Number($(e).find(`#paciente-${i}-altura`).text().trim().split(' ').shift()),
        peso: Number($(e).find(`#paciente-${i}-peso`).text().trim().split(' ').shift()),
      })).toArray();

      const pacientes = server.db.pacientes;
      const pacientesEncontrados = pacientes.filter(p => {
        const nomeCompleto = `${p.primeiroNome} ${p.sobrenome}`;
        return nomeCompleto.includes(nome);
      });
      const pacientesFormatted = pacientesEncontrados.map(p => ({
        cpf: p.cpf,
        nome: `${p.primeiroNome} ${p.sobrenome}`,
        dataNascimento: p.dataNascimento,
        altura: p.altura,
        peso: p.peso,
      }));

      assert.deepEqual(
        renderedPacientes,
        pacientesFormatted,
        'Pacientes encontrados devem ser os mesmos renderizados',
      );
    })

    .then('devo ver uma tabela com o registro dos pacientes com o cpf "$cpf"', (cpf) => {
      const renderedPacientes = $('#tbl-pacientes tbody tr').map((i,e) => ({
        cpf: $(e).find(`#paciente-${i}-cpf`).text().trim().replace(/[^Z0-9 ]/g, ''),
        nome: $(e).find(`#paciente-${i}-nomeCompleto`).text().trim(),
        dataNascimento: $(e).find(`#paciente-${i}-dataNascimento`).text().trim(),
        altura: Number($(e).find(`#paciente-${i}-altura`).text().trim().split(' ').shift()),
        peso: Number($(e).find(`#paciente-${i}-peso`).text().trim().split(' ').shift()),
      })).toArray();

      const pacientes = server.db.pacientes;
      const pacientesEncontrados = pacientes.filter(p => p.cpf === cpf);
      const pacientesFormatted = pacientesEncontrados.map(p => ({
        cpf: p.cpf,
        nome: `${p.primeiroNome} ${p.sobrenome}`,
        dataNascimento: p.dataNascimento,
        altura: p.altura,
        peso: p.peso,
      }));

      assert.deepEqual(
        renderedPacientes,
        pacientesFormatted,
        'Pacientes encontrados devem ser os mesmos renderizados',
      );
    });
}
